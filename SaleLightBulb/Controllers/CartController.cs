using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Services;

namespace SaleLightBulb.Controllers
{
    public class CartController : BaseController
    {
        private readonly ICartService _cartService;
        public CartController(ICartService cartService) : base()
        {
            _cartService = cartService;
        }

        [Authorize]
        [HttpGet(nameof(GetCartOfCurrentUser))]
        public Task<IList<CartDto>> GetCartOfCurrentUser()
        {
            return _cartService.GetCartOfCurrentUser();
        }

        [Authorize]
        [HttpPost("addProductToCart/{productId}")]
        public Task<CartDto> AddProductToCart(int productId)
        {
            return _cartService.AddProductToCart(productId);
        }

        [Authorize]
        [HttpDelete("deleteCart/{cartId}")]
        public Task<CartDto> DeleteCart(int cartId)
        {
            return _cartService.DeleteCart(cartId);
        }

        [Authorize]
        [HttpPost("orderProductInCart/{cartId}")]
        public Task<OrderDto> OrderProductInCart(int cartId)
        {
            return _cartService.OrderProductInCart(cartId);
        }

        [Authorize]
        [HttpPost("increaseProductAmount/{cartId}")]
        public Task<CartDto> IncreaseProductAmount(int cartId)
        {
            return _cartService.IncreaseProductAmount(cartId);
        }

        [Authorize]
        [HttpPost("decreaseProductAmount/{cartId}")]
        public Task<CartDto> DecreaseProductAmount(int cartId)
        {
            return _cartService.DecreaseProductAmount(cartId);
        }

        [Authorize]
        [HttpGet(nameof(GetCartLengthOfCurrentUSer))]
        public Task<int> GetCartLengthOfCurrentUSer()
        {
            return _cartService.GetCartLengthOfCurrentUSer();
        }
    }
}
