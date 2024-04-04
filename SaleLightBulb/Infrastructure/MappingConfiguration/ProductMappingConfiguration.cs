using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaleLightBulb.Infrastructure.Domain.Entities;

namespace SaleLightBulb.Infrastructure.MappingConfiguration
{
    public class ProductMappingConfiguration : AuditBaseEntityMappingConfiguration<Product>
    {
        public override void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasOne(x => x.Category).WithMany(x => x.Products).HasForeignKey(x => x.CategoryId).OnDelete(DeleteBehavior.NoAction);

            builder.Property(x => x.Code).HasMaxLength(32);
            builder.Property(x => x.Color).HasMaxLength(50);
            builder.Property(x => x.VoltageOrPowerCapacity).HasMaxLength(50);
            builder.Property(x => x.Amount).HasDefaultValue(0);
            builder.Property(x => x.Size).HasMaxLength(50);
            builder.Property(x => x.Name).HasMaxLength(256);
            builder.Property(x => x.Price).HasDefaultValue(0);

            base.Configure(builder);
        }
    }
}
