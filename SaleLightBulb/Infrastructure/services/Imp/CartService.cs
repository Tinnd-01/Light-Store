using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SaleLightBulb.Auth;
using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Domain.Entities;
using SaleLightBulb.Infrastructure.Repositories;

namespace SaleLightBulb.Infrastructure.Services.Imp
{
    public class CartService : BaseService<Cart>, ICartService
    {
        private readonly IUserResolver _userResolver;
        private readonly IRepository<Product> _productRepository;
        private readonly IRepository<Order> _orderRepository;

        public CartService(IMapper mapper, IRepository<Cart> repository,
            IUserResolver userResolver, IRepository<Product> productRepository,
            IRepository<Order> orderRepository) : base(mapper, repository)
        {
            _userResolver = userResolver;
            _productRepository = productRepository;
            _orderRepository = orderRepository;
        }

        public async Task<CartDto> AddProductToCart(int productId)
        {
            var userId = _userResolver.CurrentUser.Id;
            var product = await _productRepository.Get().SingleOrDefaultAsync(x => x.Id == productId);

            if (product == null)
            {
                throw new Exception("Không tìm thấy sản phẩm này");
            }

            var cart = await Repository.Get().SingleOrDefaultAsync(x => x.ProductId == productId && userId == x.UserId);
            Cart result;

            if (cart != null)
            {
                cart.Amount += 1;
                result = await Repository.UpdateAsync(cart);
            }
            else
            {
                var newCart = new Cart
                {
                    ProductId = productId,
                    UserId = userId,
                    Amount = 1,
                };

                result = await Repository.AddAsync(newCart);
            }
            Repository.SaveChanges();
            return Mapper.Map<CartDto>(result);
        }

        public async Task<CartDto> DecreaseProductAmount(int cartId)
        {
            var cart = await Repository.Get().SingleOrDefaultAsync(x => x.Id == cartId);
            if (cart == null)
            {
                throw new Exception("Không tìm thấy sản phẩm trong giỏ hàng");
            }

            if (cart.Amount > 1)
            {
                cart.Amount -= 1;
            }

            var result = await Repository.UpdateAsync(cart);

            Repository.SaveChanges();

            return Mapper.Map<CartDto>(result);
        }

        public async Task<CartDto> DeleteCart(int cartId)
        {
            var userId = _userResolver.CurrentUser.Id;
            var cart = await Repository.Get().SingleOrDefaultAsync(x => x.Id == cartId);

            if (cart == null)
            {
                throw new Exception("Không tìm thấy sản phẩm trong giỏ hàng");
            }

            await Repository.RemoveAsync(cart);
            Repository.SaveChanges();
            return Mapper.Map<CartDto>(cart);
        }

        public async Task<int> GetCartLengthOfCurrentUSer()
        {
            return await Repository.Get().Where(x => x.UserId == _userResolver.CurrentUser.Id).CountAsync();
        }

        public async Task<IList<CartDto>> GetCartOfCurrentUser()
        {
            var userId = _userResolver.CurrentUser.Id;
            var carts = await Repository.Get()
                .Include(x => x.Product)
                .Include(x => x.User)
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.CreatedOn)
                .ToListAsync();

            return Mapper.Map<IList<CartDto>>(carts);
        }

        public async Task<CartDto> IncreaseProductAmount(int cartId)
        {
            var cart = await Repository.Get().SingleOrDefaultAsync(x => x.Id == cartId);
            if (cart == null)
            {
                throw new Exception("Không tìm thấy sản phẩm trong giỏ hàng");
            }

            cart.Amount += 1;

            var result = await Repository.UpdateAsync(cart);

            Repository.SaveChanges();

            return Mapper.Map<CartDto>(result);
        }

        public async Task<OrderDto> OrderProductInCart(int cartId)
        {
            var cart = await Repository.Get().SingleOrDefaultAsync(x => x.Id == cartId);

            if (cart == null)
            {
                throw new Exception("Không tìm thấy sản phẩm trong giỏ hàng");
            }

            var result = await _orderRepository.AddAsync(new Order
            {
                ProductId = cart.ProductId,
                OrderByUserId = cart.UserId,
                Amount = cart.Amount,
                AddressId = _userResolver.CurrentUser.Addresses.FirstOrDefault()?.Id ?? 0
            });

            await Repository.RemoveAsync(cart);

            Repository.SaveChanges();

            return Mapper.Map<OrderDto>(result);
        }
    }
}
