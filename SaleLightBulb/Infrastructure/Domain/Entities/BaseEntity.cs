using SaleLightBulb.Infrastructure.Domain.Entities.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace SaleLightBulb.Infrastructure.Domain.Entities
{
    public abstract class BaseEntity : IIdentity, IVersionable, IBaseEntity
    {
        public int Id { get; set; }

        public byte[] RowVersion { get; set; }
    }
}
