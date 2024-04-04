using SaleLightBulb.Infrastructure.Domain.Entities;

namespace SaleLightBulb.Dtos
{
    public class ProductDto : BaseDto
    {
        public string? Name { get; set; }

        public string? Code { get; set; }

        public string? Color { get; set; }

        public string? VoltageOrPowerCapacity { get; set; }

        public string? Size { get; set; }

        public int Amount { get; set; }

        public uint Price { get; set; }

        public string? Detail { get; set; }

        public int CategoryId { get; set; }

        public int AddedByUserId { get; set; }

        public string? Image { get; set; }

        public bool? IsWishList { get; set; }
    }
}
