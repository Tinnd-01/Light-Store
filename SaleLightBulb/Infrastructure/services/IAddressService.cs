using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Domain.Entities;

namespace SaleLightBulb.Infrastructure.Services
{
    public interface IAddressService : IBaseService<Address>
    {
        Task<IList<AddressDto>> GetAddressesOfUser(int userId);
    }
}
