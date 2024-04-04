namespace SaleLightBulb.Dtos
{
    public class CategoryDto: BaseDto
    {
        public string Name { get; set; }
        public IList<ProductDto> Products { get; set; }
    }
}
