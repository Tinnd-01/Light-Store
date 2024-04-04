using Microsoft.AspNetCore.Identity;
using SaleLightBulb.Infrastructure.Domain.Entities.Interfaces;
using SaleLightBulb.Infrastructure.Domain.Enums;
using SaleLightBulb.Infrastructure.Repositories;
using System.ComponentModel.DataAnnotations.Schema;

namespace SaleLightBulb.Infrastructure.Domain.Entities
{
    public class User : BaseEntity
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string? PhoneNumber { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public Role Role { get; set; }

        public virtual ICollection<Address> Addresses { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<WishList> WishLists { get; set; }

        public virtual ICollection<Cart> Carts { get; set; }

        [NotMapped]
        public string FullName => $"{FirstName} {LastName}";
    }
}
