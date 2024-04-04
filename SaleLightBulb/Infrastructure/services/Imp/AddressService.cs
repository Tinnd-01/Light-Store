using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Domain.Entities;
using SaleLightBulb.Infrastructure.Repositories;

namespace SaleLightBulb.Infrastructure.Services.Imp
{
    public class AddressService : BaseService<Address>, IAddressService
    {
        public AddressService(IMapper mapper, IRepository<Address> repository) : base(mapper, repository)
        {
        }

        public async Task<IList<AddressDto>> GetAddressesOfUser(int userId)
        {
            var result = await Repository.Get().Where(x => x.UserId == userId).ToListAsync();
            return Mapper.Map<IList<AddressDto>>(result);
        }
    }
}
