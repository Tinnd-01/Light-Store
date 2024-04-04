using AutoMapper;
using SaleLightBulb.Infrastructure.Context;
using SaleLightBulb.Infrastructure.Domain.Entities.Interfaces;
using SaleLightBulb.Infrastructure.Repositories;

namespace SaleLightBulb.Infrastructure.Services.Imp
{
    public class BaseService<T> : IBaseService<T> where T : class, IBaseEntity
    {
        protected readonly IMapper Mapper;
        protected readonly IRepository<T> Repository;

        public BaseService(IMapper mapper, IRepository<T> repository)
        {
            Mapper = mapper;
            Repository = repository;
        }
    }
}
