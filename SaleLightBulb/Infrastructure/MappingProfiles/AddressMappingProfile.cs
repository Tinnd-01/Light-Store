using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Domain.Entities;

namespace SaleLightBulb.Infrastructure.MappingProfiles
{
    public class AddressMappingProfile : BaseMappingProfile<Address>
    {
        public AddressMappingProfile()
        {
            CreateMap<AddressDto, Address>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.AddressDetail, opt => opt.MapFrom(src => src.AddressDetail))
                .ForMember(dest => dest.District, opt => opt.MapFrom(src => src.District))
                .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.City))
                .ForMember(dest => dest.RowVersion, opt => opt.MapFrom(src => src.RowVersion))
                .ReverseMap()
                .ForMember(dest => dest.CanDelete, opt => opt.MapFrom(src => !src.Orders.Any()));
        }
    }
}
