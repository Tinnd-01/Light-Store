using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Domain.Entities;

namespace SaleLightBulb.Infrastructure.Services
{
    public interface IUserService : IBaseService<User>
    {
        Task DeleteUser(int userId);
        Task<UserDto> GetCurrentUser();
        Task<UserDto> GetUserById(int userId);
        Task<IList<UserDto>> GetUsers();
        Task<AuthDto> Login(LoginDto login);
        Task<AuthDto> ReLogin();
        void SignOut();
        Task SignUp(SignUpDto signUpDto);
        Task<UserDto> UpdateProfile(UserDto user);
        Task<UserDto> UpdateUser(UserDto user);
    }
}
