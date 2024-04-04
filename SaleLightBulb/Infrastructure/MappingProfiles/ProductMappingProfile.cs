using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Domain.Entities;

namespace SaleLightBulb.Infrastructure.MappingProfiles
{
    public class ProductMappingProfile : BaseMappingProfile<Product>
    {
        public ProductMappingProfile()
        {
            CreateMap<Product, ProductDto>()
                .ReverseMap();
        }
    }
}
