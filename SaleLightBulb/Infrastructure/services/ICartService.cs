using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Domain.Entities;

namespace SaleLightBulb.Infrastructure.Services
{
    public interface ICartService : IBaseService<Cart>
    {
        Task<CartDto> AddProductToCart(int productId);
        Task<CartDto> DecreaseProductAmount(int cartId);
        Task<CartDto> DeleteCart(int cartId);
        Task<int> GetCartLengthOfCurrentUSer();
        Task<IList<CartDto>> GetCartOfCurrentUser();
        Task<CartDto> IncreaseProductAmount(int cartId);
        Task<OrderDto> OrderProductInCart(int cartId);
    }
}
