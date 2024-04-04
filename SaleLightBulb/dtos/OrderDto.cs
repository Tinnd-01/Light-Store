namespace SaleLightBulb.Dtos
{
    public class OrderDto : BaseDto
    {
        public int ProductId { get; set; }

        public int AddressId { get; set; }

        public int OrderByUserId { get; set; }

        public int Amount { get; set; }

        public virtual ProductDto Product { get; set; }

        public virtual AddressDto Address { get; set; }

        public virtual UserDto OrderByUser { get; set; }
    }
}
