using System.ComponentModel.DataAnnotations.Schema;

namespace SaleLightBulb.Infrastructure.Domain.Entities
{
    public class Product : AuditBaseEntity
    {
        public string Image { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        public string? Color { get; set; }

        public string? VoltageOrPowerCapacity { get; set; }

        public string? Size { get; set; }
        
        public int Amount { get; set; }

        public uint Price { get; set; }

        public string? Detail { get; set; }

        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }

        public virtual ICollection<Order> Orders { get; set; }

        public virtual ICollection<WishList> WishLists { get; set; }

        public virtual ICollection<Cart> Carts { get; set; }
    }
}
