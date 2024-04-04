using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaleLightBulb.Infrastructure.Domain.Entities;

namespace SaleLightBulb.Infrastructure.MappingConfiguration
{
    public class CartMappingConfiguration : AuditBaseEntityMappingConfiguration<Cart>
    {
        public override void Configure(EntityTypeBuilder<Cart> builder)
        {
            builder.HasOne(x => x.User).WithMany(x => x.Carts).HasForeignKey(x => x.UserId);
            builder.HasOne(x => x.Product).WithMany(x => x.Carts).HasForeignKey(x => x.ProductId);
            base.Configure(builder);
        }
    }
}
