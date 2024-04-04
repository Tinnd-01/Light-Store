namespace SaleLightBulb.Dtos
{
    public class AuthDto
    {
        public UserDto CurrentUser { get; set; }
        public string AccessToken { get; set; }
        public int ExpiresIn { get; set; }
    }
}
