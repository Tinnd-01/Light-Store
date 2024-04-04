using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Services;

namespace SaleLightBulb.Controllers
{
    public class ProductController : BaseController
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService) : base()
        {
            _productService = productService;
        }

        [HttpGet("GetProductByCategoryId/{categoryId}")]
        public Task<IList<ProductDto>> GetProductByCategoryId(int categoryId)
        {
            return _productService.GetProductByCategoryId(categoryId);
        }

        [HttpGet("getProductById/{productId}")]
        public Task<ProductDto> GetProductById(int productId)
        {
            return _productService.GetProductById(productId);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("addNewProduct")]
        public Task<ProductDto> AddNewProduct([FromBody] ProductDto product)
        {
            return _productService.AddNewProduct(product);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("removeProduct/{productId}")]
        public Task RemoveProduct(int productId)
        {
            return _productService.RemoveProduct(productId);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("updateProduct")]
        public Task<int> UpdateProduct([FromBody] ProductDto product)
        {
            return _productService.UpdateProduct(product);
        }

        [Authorize]
        [HttpGet("GetWishListOfCurrentUser")]
        public Task<IList<ProductDto>> GetWishListOfCurrentUser()
        {
            return _productService.GetWishListOfCurrentUser();
        }

        [Authorize]
        [HttpPost("AddToWishListOfCurrentUser/{productId}")]
        public Task<bool> AddToWishListOfCurrentUser(int productId)
        {
            return _productService.AddToWishListOfCurrentUser(productId);
        }

        [HttpGet("search")]
        public Task<IList<ProductDto>> Search([FromQuery] string search)
        {
            return _productService.Search(search);
        }
    }
}
