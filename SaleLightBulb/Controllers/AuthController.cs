using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Services;

namespace SaleLightBulb.Controllers
{
    public class AuthController : BaseController
    {
        private readonly IUserService _userService;
        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("signUp")]
        public async Task SignUp([FromBody] SignUpDto signUp)
        {
            await _userService.SignUp(signUp);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<AuthDto> Login([FromBody] LoginDto login)
        {
            var result = await _userService.Login(login);
            return result;
        }

        [Authorize]
        [HttpPost("signOut")]
        public void SignOut()
        {
            _userService.SignOut();
        }

        [Authorize]
        [HttpPost("reLogin")]
        public Task<AuthDto> ReLogin()
        {
            return _userService.ReLogin();
        }
    }
}
