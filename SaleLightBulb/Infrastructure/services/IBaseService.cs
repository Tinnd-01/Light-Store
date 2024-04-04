using SaleLightBulb.Infrastructure.Domain.Entities;
using SaleLightBulb.Infrastructure.Domain.Entities.Interfaces;

namespace SaleLightBulb.Infrastructure.Services
{
    public interface IBaseService<T> where T : class, IBaseEntity
    {
    }
}
