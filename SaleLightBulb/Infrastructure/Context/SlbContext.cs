
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using SaleLightBulb.Auth;
using SaleLightBulb.Infrastructure.Domain.Entities;
using SaleLightBulb.Infrastructure.Domain.Entities.Interfaces;
using SaleLightBulb.Infrastructure.MappingConfiguration;

namespace SaleLightBulb.Infrastructure.Context
{
    public class SlbContext : DbContext, ISlbContext
    {
        private readonly IUserResolver _userResolver;
        public SlbContext(DbContextOptions options, IUserResolver userResolver) : base(options)
        {
            _userResolver = userResolver;
        }

        public SlbContext(DbContextOptions options) : base(options) { }

        protected virtual DbSet<Product> Products { get; set; }

        protected virtual DbSet<Order> Orders { get; set; }

        protected virtual DbSet<Category> Categories { get; set; }

        protected virtual DbSet<Address> Addresses { get; set; }

        protected virtual DbSet<WishList> WishLists { get; set; }

        protected virtual DbSet<Cart> Carts { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new AddressMappingConfiguration());
            builder.ApplyConfiguration(new CategoryMappingConfiguration());
            builder.ApplyConfiguration(new OrderMappingConfiguration());
            builder.ApplyConfiguration(new ProductMappingConfiguration());
            builder.ApplyConfiguration(new UserMappingConfiguration());
            builder.ApplyConfiguration(new WishListMappingConfiguration());
            builder.ApplyConfiguration(new CartMappingConfiguration());

            base.OnModelCreating(builder);
        }

        public override int SaveChanges()
        {
            AddAuditData();
            AdaptRowVersion();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            AddAuditData();
            AdaptRowVersion();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void AddAuditData()
        {
            AddAuditData(ChangeTracker.Entries<AuditBaseEntity>().Select(x => (x.Entity, x.State)));
        }

        private void AddAuditData(IEnumerable<(AuditBaseEntity Entity, EntityState State)> entities)
        {
            foreach (var entityEntry in entities.Where(x =>
              x.Entity != null && (x.State == EntityState.Modified || x.State == EntityState.Added)))
            {
                var entity = entityEntry.Entity;
                entity.ModifiedBy = _userResolver.CurrentUser?.Email;
                entity.ModifiedOn = DateTimeOffset.UtcNow;
                if (entityEntry.State == EntityState.Added)
                {
                    entity.CreatedBy = _userResolver.CurrentUser?.Email;
                    entity.CreatedOn = DateTimeOffset.UtcNow;
                }
            }
        }

        private void AdaptRowVersion()
        {
            var auditEntries = ChangeTracker.Entries<AuditBaseEntity>();
            foreach (var entityEntry in auditEntries.Where(x =>
              x?.Entity != null && (x.State == EntityState.Modified || x.State == EntityState.Added)))
            {
                if (entityEntry.State == EntityState.Modified)
                {
                    entityEntry.OriginalValues[nameof(BaseEntity.RowVersion)] = entityEntry.Entity.RowVersion;
                }
            }
        }

        public IQueryable<T> Get<T>() where T : class, IBaseEntity
        {
            return base.Set<T>().AsNoTracking();
        }

        public override async ValueTask<EntityEntry<TEntity>> AddAsync<TEntity>(TEntity entity, CancellationToken cancellationToken = new CancellationToken())
      where TEntity : class
        {

            return await Set<TEntity>().AddAsync(entity, cancellationToken);
        }

        public override async Task AddRangeAsync(params object[] entities)
        {
            await base.AddRangeAsync(entities);
        }

        public override async Task AddRangeAsync(IEnumerable<object> entities, CancellationToken cancellationToken = new CancellationToken())
        {
            await base.AddRangeAsync(entities, cancellationToken);
        }

        public Task<EntityEntry<T>> UpdateAsync<T>(T entity) where T : class, IBaseEntity
        {
            return Task.FromResult(Set<T>().Update(entity));
        }

        public Task UpdateRangeAsync<T>(IEnumerable<T> entities) where T : class, IBaseEntity
        {
            Set<T>().UpdateRange(entities);
            return Task.CompletedTask;
        }

        public Task<EntityEntry<T>> RemoveAsync<T>(T entity) where T : class, IBaseEntity
        {
            return Task.FromResult(Set<T>().Remove(entity));
        }

        public Task RemoveRangeAsync<T>(IEnumerable<T> entities) where T : class, IBaseEntity
        {
            Set<T>().RemoveRange(entities);
            return Task.CompletedTask;
        }

        public Task ClearChangeTracker()
        {
            ChangeTracker.Clear();
            return Task.CompletedTask;
        }

        public IEnumerable<EntityEntry<T>> Entries<T>() where T : class, IBaseEntity
        {
            return ChangeTracker.Entries<T>();
        }
    }
}
