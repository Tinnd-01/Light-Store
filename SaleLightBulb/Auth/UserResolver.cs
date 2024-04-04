using SaleLightBulb.Infrastructure.Domain.Entities;

namespace SaleLightBulb.Auth
{
    public class UserResolver : IUserResolver
    {
        public User? CurrentUser { get; set; }

        public bool HasUser => CurrentUser != null;

        public bool IsAdmin => HasUser && CurrentUser.Role == Infrastructure.Domain.Enums.Role.Admin;
    }
}
