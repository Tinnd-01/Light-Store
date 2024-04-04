using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaleLightBulb.Infrastructure.Domain.Entities;

namespace SaleLightBulb.Infrastructure.MappingConfiguration
{
    public class OrderMappingConfiguration : AuditBaseEntityMappingConfiguration<Order>
    {
        public override void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasOne(x => x.OrderByUser).WithMany(x => x.Orders).HasForeignKey(x => x.OrderByUserId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Address).WithMany(x => x.Orders).HasForeignKey(x => x.AddressId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Product).WithMany(x => x.Orders).HasForeignKey(x => x.ProductId).OnDelete(DeleteBehavior.NoAction);

            base.Configure(builder);
        }
    }
}
