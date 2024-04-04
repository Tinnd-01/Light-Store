using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaleLightBulb.Infrastructure.Domain.Entities;
using System.Text.Json.Serialization;

namespace SaleLightBulb.Infrastructure.MappingConfiguration
{
    public class UserMappingConfiguration : BaseEntityMappingConfiguration<Domain.Entities.User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(x => x.Email).HasMaxLength(256).IsUnicode();
            builder.Property(x => x.FirstName).HasMaxLength(300);
            builder.Property(x => x.LastName).HasMaxLength(300);
            builder.Property(x => x.PhoneNumber).HasMaxLength(15).IsUnicode();
            builder.Property(x => x.Password);

            base.Configure(builder);
        }
    }
}
