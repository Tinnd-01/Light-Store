using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Services;

namespace SaleLightBulb.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize]
        [HttpPost("updateProfile")]
        public Task<UserDto> UpdateProfile([FromBody] UserDto user)
        {
            return _userService.UpdateProfile(user);
        }

        [Authorize]
        [HttpGet]
        public Task<UserDto> GetCurrentUser()
        {
            return _userService.GetCurrentUser();
        }

        [Authorize(Roles = "Admin")]
        [HttpGet(nameof(GetUsers))]
        public Task<IList<UserDto>> GetUsers()
        {
            return _userService.GetUsers();
        }

        [Authorize(Roles = "Admin")]
        [HttpGet(nameof(GetUserById))]
        public Task<UserDto> GetUserById([FromQuery] int userId)
        {
            return _userService.GetUserById(userId);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete(nameof(DeleteUser))]
        public Task DeleteUser([FromQuery] int userId)
        {
            return _userService.DeleteUser(userId);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost(nameof(UpdateUser))]
        public Task<UserDto> UpdateUser([FromBody] UserDto user)
        {
            return _userService.UpdateUser(user);
        }
    }
}
