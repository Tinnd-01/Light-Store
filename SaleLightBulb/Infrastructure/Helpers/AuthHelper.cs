using System.Text;

namespace SaleLightBulb.Infrastructure.Helpers
{
    public static class AuthHelper
    {
        public static string EncodePassword(string password)
        {
            return Convert.ToBase64String(Encoding.UTF8.GetBytes(password));
        }

        public static bool ValidatePassword(string encodePassword, string originalPassword)
        {
            var decodePass = Encoding.UTF8.GetString(Convert.FromBase64String(encodePassword));
            return decodePass == originalPassword;
        }
    }
}
