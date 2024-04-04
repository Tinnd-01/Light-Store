using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SaleLightBulb.Auth;
using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Domain.Entities;
using SaleLightBulb.Infrastructure.Domain.Enums;
using SaleLightBulb.Infrastructure.Exceptions;
using SaleLightBulb.Infrastructure.Helpers;
using SaleLightBulb.Infrastructure.Repositories;

namespace SaleLightBulb.Infrastructure.Services.Imp
{
    public class UserService : BaseService<User>, IUserService
    {
        private readonly IUserResolver _userResolver;
        private readonly IJwtFactory _jwtFactory;
        private readonly IRepository<WishList> _wishListRepository;
        private readonly IRepository<Order> _ordersRepository;
        private readonly IRepository<Cart> _cartRepository;
        private readonly IRepository<Address> _addressRepository;

        public UserService(IMapper mapper,
            IRepository<User> repository,
            IUserResolver userResolver,
            IJwtFactory jwtFactory,
            IRepository<Address> addressRepository,
            IRepository<WishList> wishListRepository,
            IRepository<Order> ordersRepository,
            IRepository<Cart> cartRepository
            ) : base(mapper, repository)
        {
            _userResolver = userResolver;
            _jwtFactory = jwtFactory;
            _addressRepository = addressRepository;
            _wishListRepository = wishListRepository;
            _ordersRepository = ordersRepository;
            _cartRepository = cartRepository;
        }

        public async Task<AuthDto> Login(LoginDto login)
        {
            var user = await GetUserByEmail(login.Email);

            if (user == null || !AuthHelper.ValidatePassword(user.Password, login.Password))
            {
                throw new Exception("Tài khoản không tồn tại");
            }

            _userResolver.CurrentUser = user;

            var result = new AuthDto
            {
                CurrentUser = Mapper.Map<User, UserDto>(user),
                AccessToken = _jwtFactory.GenerateToken(user),
                ExpiresIn = _jwtFactory.ExpireMinutes,
            };
            return result;
        }

        public void SignOut()
        {
            _userResolver.CurrentUser = null;
        }

        public async Task SignUp(SignUpDto signUpDto)
        {
            await ValidateSignUpInformation(signUpDto);
            var user = Mapper.Map<SignUpDto, User>(signUpDto);
            user.Role = Domain.Enums.Role.User;

            user.Password = Helpers.AuthHelper.EncodePassword(user.Password);

            var address = user.Addresses.FirstOrDefault();
            if (address != null)
            {
                address.CreatedBy = user.Email;
            }

            await Repository.AddAsync(user);
            Repository.SaveChanges();
        }

        private async Task<bool> ValidateSignUpInformation(SignUpDto signUpDto)
        {
            var isNotNullValue = signUpDto != null
                && signUpDto.Email != null
                && signUpDto.LastName != null
                && signUpDto.FirstName != null
                && signUpDto.Password != null
                && signUpDto.PhoneNumber != null
                && signUpDto.Address != null
                && signUpDto.Address.AddressDetail != null
                && signUpDto.Address.District != null
                && signUpDto.Address.City != null;

            if (!isNotNullValue)
            {
                throw new ArgumentException("Null information value");
            }

            var isExistEmail = await Repository.Get().AnyAsync(x => x.Email == signUpDto.Email);

            if (isExistEmail)
            {
                throw new EmailAlreadyExistException(signUpDto.Email);
            }

            return true;
        }

        private async Task<User?> GetUserByEmail(string email)
        {
            return await Repository.Get()
                .Include(x => x.Addresses)
                .ThenInclude(x => x.Orders)
                .Include(x => x.Carts)
                .SingleOrDefaultAsync(x => x.Email == email);
        }

        public async Task<AuthDto> ReLogin()
        {
            if (_userResolver.CurrentUser == null)
            {
                throw new Exception("Phiên đăng nhập đã hết hạng");
            }


            var result = new AuthDto
            {
                CurrentUser = Mapper.Map<User, UserDto>(_userResolver.CurrentUser),
                AccessToken = _jwtFactory.GenerateToken(_userResolver.CurrentUser),
                ExpiresIn = _jwtFactory.ExpireMinutes,
            };
            return result;
        }

        public async Task<UserDto> UpdateProfile(UserDto user)
        {
            if (user.Id != _userResolver.CurrentUser.Id)
            {
                throw new Exception("Bạn không có quyền chỉnh sửa thông tin của tài khoản này");
            }


            var oldUserData = await Repository.Get().SingleOrDefaultAsync(x => x.Id == user.Id);
            var newUserData = Mapper.Map<User>(user);

            oldUserData.PhoneNumber = newUserData.PhoneNumber;
            oldUserData.FirstName = newUserData.FirstName;
            oldUserData.LastName = newUserData.LastName;

            var addresses = newUserData.Addresses;
            var currentAddress = await _addressRepository.Get().Include(x => x.Orders).Where(x => x.UserId == user.Id).ToListAsync();

            var deleteAddress = currentAddress.Where(x => !x.Orders.Any() && !addresses.Any(a => a.Id == x.Id)).ToList();
            var addAddress = addresses.Where(x => x.Id == 0)
                .Select(x =>
                {
                    x.UserId = user.Id;
                    return x;
                }).ToList();

            var updateAddress = addresses
                .Where(x => currentAddress.Any(a => a.Id == x.Id))
                .Select(x =>
                {
                    x.UserId = user.Id;
                    return x;
                }).ToList();

            updateAddress.ForEach(address =>
            {
                var a = currentAddress.FirstOrDefault(x => x.Id == address.Id);
                address.RowVersion = a.RowVersion;
            });

            await _addressRepository.UpdateRangeAsync(updateAddress);
            await _addressRepository.AddRangeAsync(addAddress);
            await _addressRepository.RemoveRangeAsync(deleteAddress);

            var result = await Repository.UpdateAsync(oldUserData);
            Repository.SaveChanges();

            return Mapper.Map<UserDto>(await GetUserByEmail(result.Email));
        }

        public async Task<UserDto> GetCurrentUser()
        {
            var result = await Repository.Get()
                .Include(x => x.Addresses)
                .ThenInclude(x => x.Orders)
                .Include(x => x.Carts)
                .SingleOrDefaultAsync(x => x.Id == _userResolver.CurrentUser.Id);

            return Mapper.Map<UserDto>(result);
        }

        public async Task<IList<UserDto>> GetUsers()
        {
            var result = await Repository.Get()
                .Where(x => x.Id != _userResolver.CurrentUser.Id && x.Role != Role.Admin)
                .ToListAsync();

            return Mapper.Map<IList<UserDto>>(result);
        }

        public async Task DeleteUser(int userId)
        {
            var user = await Repository.Get()
                .Include(x => x.Carts)
                .Include(x => x.Orders)
                .Include(x => x.Addresses)
                .Include(x => x.WishLists)
                .SingleOrDefaultAsync(x => x.Id == userId);
            if (user == null)
            {
                throw new Exception("Không tìm thấy tài khoản người dùng");
            }

            await _cartRepository.RemoveRangeAsync(user.Carts);
            await _wishListRepository.RemoveRangeAsync(user.WishLists);
            await _ordersRepository.RemoveRangeAsync(user.Orders);
            await _addressRepository.RemoveRangeAsync(user.Addresses);
            await Repository.RemoveAsync(user);

            Repository.SaveChanges();
        }

        public async Task<UserDto> UpdateUser(UserDto user)
        {
            var oldUserData = await Repository.Get().SingleOrDefaultAsync(x => x.Id == user.Id);
            var newUserData = Mapper.Map<User>(user);

            oldUserData.PhoneNumber = newUserData.PhoneNumber;
            oldUserData.FirstName = newUserData.FirstName;
            oldUserData.LastName = newUserData.LastName;

            var addresses = newUserData.Addresses;
            var currentAddress = await _addressRepository.Get().Include(x => x.Orders).Where(x => x.UserId == user.Id).ToListAsync();

            var deleteAddress = currentAddress.Where(x => !x.Orders.Any() && !addresses.Any(a => a.Id == x.Id)).ToList();
            var addAddress = addresses.Where(x => x.Id == 0)
                .Select(x =>
                {
                    x.UserId = user.Id;
                    return x;
                }).ToList();

            var updateAddress = addresses
                .Where(x => currentAddress.Any(a => a.Id == x.Id))
                .Select(x =>
                {
                    x.UserId = user.Id;
                    return x;
                }).ToList();

            updateAddress.ForEach(address =>
            {
                var a = currentAddress.FirstOrDefault(x => x.Id == address.Id);
                address.RowVersion = a.RowVersion;
            });

            await _addressRepository.UpdateRangeAsync(updateAddress);
            await _addressRepository.AddRangeAsync(addAddress);
            await _addressRepository.RemoveRangeAsync(deleteAddress);

            var result = await Repository.UpdateAsync(oldUserData);
            Repository.SaveChanges();

            return Mapper.Map<UserDto>(await GetUserByEmail(result.Email));
        }

        public async Task<UserDto> GetUserById(int userId)
        {
            var result = await Repository.Get()
                .Include(x => x.Carts)
                .Include(x => x.Orders)
                .Include(x => x.Addresses)
                .ThenInclude(x => x.Orders)
                .Include(x => x.WishLists)
                .SingleOrDefaultAsync(x => x.Id == userId);

            if (result == null)
            {
                throw new Exception("Không tìm thấy tài khoản người dùng");
            }

            return Mapper.Map<UserDto>(result);
        }
    }
}
