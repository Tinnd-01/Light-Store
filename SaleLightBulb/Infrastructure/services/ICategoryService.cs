using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Domain.Entities;

namespace SaleLightBulb.Infrastructure.Services
{
    public interface ICategoryService : IBaseService<Category>
    {
        Task<IList<CategoryDto>> GetAll();
        Task<CategoryDto> GetCategory(int categoryId);
        Task<IList<CategoryDto>> GetDashboard();
    }
}
