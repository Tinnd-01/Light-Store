namespace SaleLightBulb.Infrastructure.Domain.Entities
{
    public abstract class AuditBaseEntity : BaseEntity
    {
        public string? CreatedBy { get; set; }

        public DateTimeOffset CreatedOn { get; set; } = DateTimeOffset.UtcNow;

        public string? ModifiedBy { get; set; }

        public DateTimeOffset ModifiedOn { get; set; } = DateTimeOffset.UtcNow;
    }
}
