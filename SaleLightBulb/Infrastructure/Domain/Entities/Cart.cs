namespace SaleLightBulb.Infrastructure.Domain.Entities
{
    public class Cart : AuditBaseEntity
    {
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public int Amount { get; set; }

        public virtual Product Product { get; set; }
        public virtual User User { get; set; }
    }
}
