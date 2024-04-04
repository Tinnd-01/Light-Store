using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SaleLightBulb.Auth;
using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Domain.Entities;
using SaleLightBulb.Infrastructure.Repositories;

namespace SaleLightBulb.Infrastructure.Services.Imp
{
    public class OrderService : BaseService<Order>, IOrderService
    {
        private readonly IRepository<Product> _productRepository;
        private readonly IUserResolver _userResolver;
        private readonly IProductService _productService;
        public OrderService(IMapper mapper,
            IRepository<Order> repository,
            IRepository<Product> productRepository,
            IUserResolver userResolver,
            IProductService productService) : base(mapper, repository)
        {
            _productRepository = productRepository;
            _userResolver = userResolver;
            _productService = productService;
        }

        public async Task<OrderDto> DecreaseProductAmount(int orderId)
        {
            var order = await Repository.Get()
                .Include(x => x.Product)
                .Include(x => x.OrderByUser)
                .Include(x => x.Address)
                .SingleOrDefaultAsync(x => x.Id == orderId);
            if (order == null)
            {
                throw new Exception("Không tìm thấy đơn đặt hàng này");
            }

            if (order.Amount <= 1)
            {
                throw new Exception("Không thể giảm số lượng sản phẩm");
            }
            order.Amount -= 1;

            var product = order.Product;
            product.Amount += 1;

            await _productRepository.UpdateAsync(product);
            await Repository.UpdateAsync(order);
            Repository.SaveChanges();
            return Mapper.Map<OrderDto>(await Repository.Get()
                .Include(x => x.Product)
                .Include(x => x.OrderByUser)
                .Include(x => x.Address)
                .SingleOrDefaultAsync(x => x.Id == orderId));
        }

        public async Task<OrderDto> GetOrderById(int orderId)
        {
            var order = await Repository.Get()
                .Include(x => x.Product)
                .Include(x => x.OrderByUser)
                .Include(x => x.Address)
                .SingleOrDefaultAsync(x => x.Id == orderId);
            if (order == null)
            {
                throw new Exception("Không tìm thấy đơn đặt hàng này");
            }
            return Mapper.Map<OrderDto>(order);
        }

        public async Task<IList<OrderDto>> GetOrdersOfCurrentUser()
        {
            var orders = Repository.Get()
                .Include(x => x.Product)
                .Include(x => x.OrderByUser)
                .Include(x => x.Address)
                .OrderByDescending(x => x.CreatedOn);

            if (!_userResolver.IsAdmin)
            {
                var result = await orders.Where(x => x.OrderByUserId == _userResolver.CurrentUser.Id).ToListAsync();
                return Mapper.Map<IList<OrderDto>>(result);
            }

            return Mapper.Map<IList<OrderDto>>(await orders.ToListAsync());
        }

        public async Task<OrderDto> IncreaseProductAmount(int orderId)
        {
            var order = await Repository.Get()
                .Include(x => x.Product)
                .Include(x => x.OrderByUser)
                .Include(x => x.Address)
                .SingleOrDefaultAsync(x => x.Id == orderId);
            if (order == null)
            {
                throw new Exception("Không tìm thấy đơn đặt hàng này");
            }

            var product = order.Product;
            if (product.Amount > 0)
            {
                order.Amount += 1;
                product.Amount -= 1;
            }
            else
            {
                throw new Exception("Số lượng sản phẩm không đủ");
            }

            await _productRepository.UpdateAsync(product);
            var result = await Repository.UpdateAsync(order);
            Repository.SaveChanges();
            return Mapper.Map<OrderDto>(result);
        }

        public async Task<ProductDto> OrderNow(int idProduct)
        {
            var product = await _productRepository.Get().SingleOrDefaultAsync(x => x.Id == idProduct);

            if (product == null)
            {
                throw new Exception("Không tìm thấy sản phẩm này");
            }

            if (product.Amount <= 0)
            {
                throw new Exception("Số lượng sản phẩm không đủ");
            }

            var order = await Repository.Get().SingleOrDefaultAsync(x => x.ProductId == idProduct && _userResolver.CurrentUser.Id == x.OrderByUserId);
            if (order != null)
            {
                order.Amount += 1;
                await Repository.UpdateAsync(order);
            }
            else
            {
                var newOrder = new Order
                {
                    ProductId = idProduct,
                    OrderByUserId = _userResolver.CurrentUser.Id,
                    Amount = 1,
                    AddressId = _userResolver.CurrentUser.Addresses.FirstOrDefault().Id
                };

                await Repository.AddAsync(newOrder);
            }
            product.Amount -= 1;
            await _productRepository.UpdateAsync(product);
            Repository.SaveChanges();

            return await _productService.GetProductById(idProduct);
        }

        public async Task RemoveOrder(int orderId)
        {
            var order = await Repository.Get()
                .Include(x => x.Product)
                .SingleOrDefaultAsync(x => x.Id == orderId);
            if (order == null)
            {
                throw new Exception("Không tìm thấy đơn đặt hàng này");
            }

            var product = order.Product;
            product.Amount += order.Amount;

            await _productRepository.UpdateAsync(product);
            await Repository.RemoveAsync(order);
            Repository.SaveChanges();
        }

        public async Task<OrderDto> UpdateOrderAddress(int orderId, int addressId)
        {
            var order = await Repository.Get()
                .SingleOrDefaultAsync(x => x.Id == orderId);

            if (order == null)
            {
                throw new Exception("Không tìm thấy đơn đặt hàng này");
            }

            order.AddressId = addressId;
            await Repository.UpdateAsync(order);

            Repository.SaveChanges();

            var result = await Repository.Get()
                .Include(x => x.Product)
                .Include(x => x.OrderByUser)
                .Include(x => x.Address)
                .SingleOrDefaultAsync(x => x.Id == orderId);

            return Mapper.Map<OrderDto>(result);
        }
    }
}
