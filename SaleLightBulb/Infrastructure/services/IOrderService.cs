using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Domain.Entities;

namespace SaleLightBulb.Infrastructure.Services
{
    public interface IOrderService : IBaseService<Order>
    {
        Task<OrderDto> DecreaseProductAmount(int orderId);
        Task<OrderDto> GetOrderById(int orderId);
        Task<IList<OrderDto>> GetOrdersOfCurrentUser();
        Task<OrderDto> IncreaseProductAmount(int orderId);
        Task<ProductDto> OrderNow(int idProduct);
        Task RemoveOrder(int orderId);
        Task<OrderDto> UpdateOrderAddress(int orderId, int addressId);
    }
}
