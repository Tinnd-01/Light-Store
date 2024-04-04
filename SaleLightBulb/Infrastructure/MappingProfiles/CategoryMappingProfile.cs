using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Domain.Entities;

namespace SaleLightBulb.Infrastructure.MappingProfiles
{
    public class CategoryMappingProfile : BaseMappingProfile<Category>
    {
        public CategoryMappingProfile()
        {
            CreateMap<Category, CategoryDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.RowVersion, opt => opt.MapFrom(src => src.RowVersion))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Products, opt => opt.MapFrom(src => src.Products))
                .ReverseMap();
        }
    }
}
