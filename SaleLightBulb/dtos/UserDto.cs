using SaleLightBulb.Infrastructure.Domain.Enums;

namespace SaleLightBulb.Dtos
{
    public class UserDto : BaseDto
    {
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public Role Role { get; set; }
        public ICollection<AddressDto> Addresses { get; set; } = new List<AddressDto>();
        public int CartLength { get; set; }
    }
}
