using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaleLightBulb.Infrastructure.Domain.Entities;

namespace SaleLightBulb.Infrastructure.MappingConfiguration
{
    public class AddressMappingConfiguration : AuditBaseEntityMappingConfiguration<Domain.Entities.Address>
    {
        public override void Configure(EntityTypeBuilder<Address> builder)
        {
            builder.HasOne(x => x.User).WithMany(x => x.Addresses).HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.NoAction);

            builder.Property(x => x.AddressDetail).HasMaxLength(512);
            builder.Property(x => x.City).HasMaxLength(128);
            builder.Property(x => x.District).HasMaxLength(128);

            base.Configure(builder);
        }
    }
}
