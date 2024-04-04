namespace SaleLightBulb.Infrastructure.Domain.Entities
{
    public class Address : AuditBaseEntity
    {
        public string City { get; set; }
        public string District { get; set; }
        public string AddressDetail { get; set; }
        public int UserId { get; set; }

        public virtual User User { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}
