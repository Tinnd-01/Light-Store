using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Domain.Entities;

namespace SaleLightBulb.Infrastructure.Services
{
    public interface IProductService : IBaseService<Product>
    {
        Task<ProductDto> AddNewProduct(ProductDto product);
        Task<bool> AddToWishListOfCurrentUser(int productId);
        Task<IList<ProductDto>> GetProductByCategoryId(int categoryId);
        Task<ProductDto> GetProductById(int productId);
        Task<IList<ProductDto>> GetWishListOfCurrentUser();
        Task RemoveProduct(int productId);
        Task<IList<ProductDto>> Search(string search);
        Task<int> UpdateProduct(ProductDto product);
    }
}
