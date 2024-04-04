using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using SaleLightBulb.Infrastructure.Domain.Entities;
using SaleLightBulb.Infrastructure.Domain.Entities.Interfaces;

namespace SaleLightBulb.Infrastructure.Repositories
{
    public interface IRepository<T> where T : class, IBaseEntity
    {
        IQueryable<T> Get();

        ValueTask<T> AddAsync(T entity, CancellationToken cancellationToken = new CancellationToken());

        Task AddRangeAsync(params T[] entities);

        Task AddRangeAsync(IEnumerable<T> entities, CancellationToken cancellationToken = new CancellationToken());

        Task<T> UpdateAsync(T entity);

        Task UpdateRangeAsync(IEnumerable<T> entities);

        Task<T> RemoveAsync(T entity);

        Task RemoveRangeAsync(IEnumerable<T> entities);

        int SaveChanges();

        Task ClearChangeTracker();
    }
}
