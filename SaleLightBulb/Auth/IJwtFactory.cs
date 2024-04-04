using System.Threading.Tasks;
using System.Security.Claims;
using SaleLightBulb.Infrastructure.Domain.Entities;

namespace SaleLightBulb.Auth
{
    public interface IJwtFactory
    {
        string GenerateToken(User user);

        int ExpireMinutes { get; }
    }
}