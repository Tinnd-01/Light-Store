using Microsoft.EntityFrameworkCore.ChangeTracking;
using SaleLightBulb.Infrastructure.Domain.Entities.Interfaces;

namespace SaleLightBulb.Infrastructure.Context
{
    public interface ISlbContext
    {
        IQueryable<T> Get<T>() where T : class, IBaseEntity;

        ValueTask<EntityEntry<TEntity>> AddAsync<TEntity>(TEntity entity, CancellationToken cancellationToken = new CancellationToken()) where TEntity : class;

        Task AddRangeAsync(params object[] entities);

        Task AddRangeAsync(IEnumerable<object> entities, CancellationToken cancellationToken = new CancellationToken());

        Task<EntityEntry<T>> UpdateAsync<T>(T entity) where T : class, IBaseEntity;

        Task UpdateRangeAsync<T>(IEnumerable<T> entities) where T : class, IBaseEntity;

        Task<EntityEntry<T>> RemoveAsync<T>(T entity) where T : class, IBaseEntity;

        Task RemoveRangeAsync<T>(IEnumerable<T> entities) where T : class, IBaseEntity;

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken());

        int SaveChanges();

        Task ClearChangeTracker();

        IEnumerable<EntityEntry<T>> Entries<T>() where T : class, IBaseEntity;
    }
}
