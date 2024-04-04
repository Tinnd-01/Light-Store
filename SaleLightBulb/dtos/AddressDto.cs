namespace SaleLightBulb.Dtos
{
    public class AddressDto: BaseDto
    {
        public string City { get; set; }
        public string District { get; set; }
        public string AddressDetail { get; set; }
        public bool CanDelete { get; set; }
    }
}
