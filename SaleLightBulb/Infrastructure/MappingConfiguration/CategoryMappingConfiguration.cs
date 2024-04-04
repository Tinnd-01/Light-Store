using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaleLightBulb.Infrastructure.Domain.Entities;

namespace SaleLightBulb.Infrastructure.MappingConfiguration
{
    public class CategoryMappingConfiguration : BaseEntityMappingConfiguration<Category>
    {
        public override void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.Property(x => x.Name).IsRequired().IsUnicode().HasMaxLength(128);

            base.Configure(builder);
        }
    }
}
