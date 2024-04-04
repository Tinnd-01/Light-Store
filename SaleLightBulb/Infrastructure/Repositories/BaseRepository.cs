using Microsoft.EntityFrameworkCore.ChangeTracking;
using SaleLightBulb.Infrastructure.Context;
using SaleLightBulb.Infrastructure.Domain.Entities;
using SaleLightBulb.Infrastructure.Domain.Entities.Interfaces;

namespace SaleLightBulb.Infrastructure.Repositories
{
    public class BaseRepository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly ISlbContext _slbContext;

        public BaseRepository(ISlbContext slbContext)
        {
            _slbContext = slbContext;
        }

        public async ValueTask<T> AddAsync(T entity, CancellationToken cancellationToken = default)
        {
            var result = await _slbContext.AddAsync(entity, cancellationToken);
            return result.Entity;
        }

        public Task AddRangeAsync(params T[] entities)
        {
            return _slbContext.AddRangeAsync(entities);
        }

        public Task AddRangeAsync(IEnumerable<T> entities, CancellationToken cancellationToken = default)
        {
            return _slbContext.AddRangeAsync(entities, cancellationToken);
        }

        public Task ClearChangeTracker()
        {
            return _slbContext.ClearChangeTracker();
        }

        public IQueryable<T> Get()
        {
            return _slbContext.Get<T>();
        }

        public async Task<T> RemoveAsync(T entity)
        {
            var result = await _slbContext.RemoveAsync(entity);
            return result.Entity;
        }

        public Task RemoveRangeAsync(IEnumerable<T> entities)
        {
            return _slbContext.RemoveRangeAsync(entities);
        }

        public int SaveChanges()
        {
            return _slbContext.SaveChanges();
        }

        public async Task<T> UpdateAsync(T entity)
        {
            var result = await _slbContext.UpdateAsync(entity);
            return result.Entity;
        }

        public Task UpdateRangeAsync(IEnumerable<T> entities)
        {
            return _slbContext.UpdateRangeAsync(entities);
        }
    }
}
