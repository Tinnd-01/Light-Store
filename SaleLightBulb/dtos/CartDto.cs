
namespace SaleLightBulb.Dtos
{
    public class CartDto : BaseDto
    {
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public int Amount { get; set; }
        public ProductDto Product { get; set; }
        public UserDto User { get; set; }
    }
}
