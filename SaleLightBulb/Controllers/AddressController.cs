using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Services;

namespace SaleLightBulb.Controllers
{
    public class AddressController : BaseController
    {
        private readonly IAddressService _addressService;
        public AddressController(IAddressService addressService) : base()
        {
            _addressService = addressService;
        }

        [Authorize]
        [HttpGet]
        public Task<IList<AddressDto>> GetAddressesOfUser(int userId)
        {
            return _addressService.GetAddressesOfUser(userId);
        }
    }
}
