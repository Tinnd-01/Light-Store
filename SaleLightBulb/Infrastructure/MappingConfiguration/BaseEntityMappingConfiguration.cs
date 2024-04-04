using Elca.PtTool.Database.MappingConfigurations;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaleLightBulb.Infrastructure.Domain.Entities;

namespace SaleLightBulb.Infrastructure.MappingConfiguration
{
    public class BaseEntityMappingConfiguration<TEntity> : BaseMappingConfiguration<TEntity>
        where TEntity : BaseEntity
    {
        public override void Configure(EntityTypeBuilder<TEntity> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();
            builder.Property(e => e.RowVersion).IsRowVersion();

            base.Configure(builder);
        }
    }
}
