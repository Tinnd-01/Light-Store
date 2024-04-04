using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Services;

namespace SaleLightBulb.Controllers
{
    public class CategoryController : BaseController
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("getAllCategory")]
        [AllowAnonymous]
        public async Task<IList<CategoryDto>> GetAllCategory()
        {
            return await _categoryService.GetAll();
        }

        [HttpGet("getDashboard")]
        [AllowAnonymous]
        public async Task<IList<CategoryDto>> GetDashboard()
        {
            return await _categoryService.GetDashboard();
        }

        [HttpGet]
        public Task<CategoryDto> GetCategory(int categoryId)
        {
            return _categoryService.GetCategory(categoryId);
        }
    }
}
