using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SaleLightBulb.Auth;
using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Domain.Entities;
using SaleLightBulb.Infrastructure.Domain.Enums;
using SaleLightBulb.Infrastructure.Repositories;

namespace SaleLightBulb.Infrastructure.Services.Imp
{
    public class ProductService : BaseService<Product>, IProductService
    {
        private readonly IUserResolver _userResolver;
        private readonly IRepository<WishList> _wishListRepository;
        private readonly IRepository<Cart> _cartRepository;
        private readonly IRepository<Order> _orderRepository;
        public ProductService(IMapper mapper, IRepository<Product> repository,
            IUserResolver userResolver, IRepository<WishList> wishListRepository,
            IRepository<Cart> cartRepository, IRepository<Order> orderRepository) : base(mapper, repository)
        {
            _userResolver = userResolver;
            _wishListRepository = wishListRepository;
            _cartRepository = cartRepository;
            _orderRepository = orderRepository;
        }

        public async Task<ProductDto> AddNewProduct(ProductDto product)
        {
            var newProduct = Mapper.Map<Product>(product);

            var productEntity = await Repository.AddAsync(newProduct);

            Repository.SaveChanges();

            return Mapper.Map<ProductDto>(productEntity);
        }

        public async Task<bool> AddToWishListOfCurrentUser(int productId)
        {
            var result = false;
            var wishList = await _wishListRepository.Get()
                .SingleOrDefaultAsync(x => x.ProductId == productId && x.UserId == _userResolver.CurrentUser.Id);
            if (wishList != null)
            {
                await _wishListRepository.RemoveAsync(wishList);
            }
            else
            {
                await _wishListRepository.AddAsync(new WishList
                {
                    ProductId = productId,
                    UserId = _userResolver.CurrentUser.Id
                });
                result = true;
            }

            _wishListRepository.SaveChanges();
            return result;
        }

        public async Task<IList<ProductDto>> GetProductByCategoryId(int categoryId)
        {
            var products = await Repository.Get().Include(x => x.WishLists).Where(x => x.CategoryId == categoryId).ToListAsync();
            var result = Mapper.Map<IList<ProductDto>>(products);

            return result;
        }

        public async Task<ProductDto> GetProductById(int productId)
        {
            var product = await Repository.Get().Include(x => x.WishLists).SingleOrDefaultAsync(x => x.Id == productId);
            var result = Mapper.Map<ProductDto>(product);
            result.IsWishList = product.WishLists.Any(x => x.UserId == _userResolver.CurrentUser?.Id);
            return Mapper.Map<ProductDto>(result);
        }

        public async Task<IList<ProductDto>> GetWishListOfCurrentUser()
        {
            var result = await _wishListRepository.Get().Include(x => x.Product)
                .Where(x => x.UserId == _userResolver.CurrentUser.Id)
                .OrderByDescending(x => x.CreatedBy)
                .Select(x => x.Product)
                .ToListAsync();
            return Mapper.Map<IList<ProductDto>>(result);
        }

        public async Task RemoveProduct(int productId)
        {
            var product = await Repository.Get()
                .Include(x => x.Carts)
                .Include(x => x.Orders)
                .Include(x => x.WishLists)
                .SingleOrDefaultAsync(x => x.Id == productId);
            if (product == null)
            {
                throw new Exception("Sản phẩm không tồn tại");
            }

            if (_userResolver.CurrentUser.Role != Role.Admin)
            {
                throw new Exception("User không có quyền xóa sản phẩm này");
            }

            await _cartRepository.RemoveRangeAsync(product.Carts);
            await _orderRepository.RemoveRangeAsync(product.Orders);
            await _wishListRepository.RemoveRangeAsync(product.WishLists);
            await Repository.RemoveAsync(product);
            Repository.SaveChanges();
        }

        public async Task<IList<ProductDto>> Search(string search)
        {
            var result = await Repository.Get().Where(x => x.Name.Contains(search)).ToListAsync();
            return Mapper.Map<IList<ProductDto>>(result);
        }

        public async Task<int> UpdateProduct(ProductDto product)
        {
            var currentProduct = await Repository.Get().SingleOrDefaultAsync(x => x.Id == product.Id);

            if (currentProduct == null)
            {
                throw new Exception("Sản phẩm không tồn tại");
            }

            if (_userResolver.CurrentUser.Role != Role.Admin)
            {
                throw new Exception("User không có quyền chỉnh sửa sản phẩm này");
            }
            var updateProduct = Mapper.Map<Product>(product);

            var result = await Repository.UpdateAsync(updateProduct);

            Repository.SaveChanges();

            return result.Id;
        }
    }
}
