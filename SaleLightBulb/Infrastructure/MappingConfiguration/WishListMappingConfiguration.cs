using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaleLightBulb.Infrastructure.Domain.Entities;

namespace SaleLightBulb.Infrastructure.MappingConfiguration
{
    public class WishListMappingConfiguration : AuditBaseEntityMappingConfiguration<WishList>
    {
        public override void Configure(EntityTypeBuilder<WishList> builder)
        {
            builder.HasOne(x => x.Product).WithMany(x => x.WishLists).HasForeignKey(x => x.ProductId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.User).WithMany(x => x.WishLists).HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.NoAction);
            base.Configure(builder);
        }
    }
}
