namespace SaleLightBulb.Infrastructure.Domain.Entities
{
    public class Order : AuditBaseEntity
    {
        public int ProductId { get; set; }

        public int AddressId { get; set; }

        public int OrderByUserId { get; set; }

        public int Amount { get; set; }

        public virtual Product Product { get; set; }

        public virtual Address Address { get; set; }

        public virtual User OrderByUser { get; set; }
    }
}
