using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Services;

namespace SaleLightBulb.Controllers
{
    public class OrderController : BaseController
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService) : base()
        {
            _orderService = orderService;
        }

        [Authorize]
        [HttpPost("orderNow/{idProduct}")]
        public Task<ProductDto> OrderNow(int idProduct)
        {
            return _orderService.OrderNow(idProduct);
        }

        [Authorize]
        [HttpGet("getOrdersOfCurrentUser")]
        public Task<IList<OrderDto>> GetOrdersOfCurrentUser()
        {
            return _orderService.GetOrdersOfCurrentUser();
        }

        [Authorize]
        [HttpGet("getOrderById/{orderId}")]
        public Task<OrderDto> GetOrderById(int orderId)
        {
            return _orderService.GetOrderById(orderId);
        }

        [Authorize]
        [HttpPost("decreaseProductAmount/{orderId}")]
        public Task<OrderDto> DecreaseProductAmount(int orderId)
        {
            return _orderService.DecreaseProductAmount(orderId);
        }

        [Authorize]
        [HttpPost("increaseProductAmount/{orderId}")]
        public Task<OrderDto> IncreaseProductAmount(int orderId)
        {
            return _orderService.IncreaseProductAmount(orderId);
        }

        [Authorize]
        [HttpDelete("removeOrder/{orderId}")]
        public Task RemoveOrder(int orderId)
        {
            return _orderService.RemoveOrder(orderId);
        }

        [Authorize]
        [HttpPost("updateOrderAddress/{orderId}/{addressId}")]
        public Task<OrderDto> UpdateOrderAddress(int orderId, int addressId)
        {
            return _orderService.UpdateOrderAddress(orderId, addressId);
        }
    }
}
