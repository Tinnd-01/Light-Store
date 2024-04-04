using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaleLightBulb.Infrastructure.Domain.Entities;

namespace SaleLightBulb.Infrastructure.MappingConfiguration
{
    public class AuditBaseEntityMappingConfiguration<TEntity> : BaseEntityMappingConfiguration<TEntity>
        where TEntity : AuditBaseEntity
    {
        public override void Configure(EntityTypeBuilder<TEntity> builder)
        {
            base.Configure(builder);
        }
    }
}
