using SaleLightBulb.Infrastructure.Domain.Entities;
using SaleLightBulb.Infrastructure.Domain.Enums;

namespace SaleLightBulb.Auth
{
    public interface IUserResolver
    {
        User? CurrentUser { get; set; }

        bool HasUser { get; }
        bool IsAdmin { get; }
    }
}
