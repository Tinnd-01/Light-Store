using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SaleLightBulb.Dtos;
using SaleLightBulb.Infrastructure.Domain.Entities;
using SaleLightBulb.Infrastructure.Repositories;

namespace SaleLightBulb.Infrastructure.Services.Imp
{
    public class CategoryService : BaseService<Category>, ICategoryService
    {
        public CategoryService(IMapper mapper, IRepository<Category> repository) : base(mapper, repository)
        {
        }

        public async Task<IList<CategoryDto>> GetAll()
        {
            return Mapper.Map<IList<Category>, IList<CategoryDto>>(await Repository.Get().ToListAsync());
        }

        public async Task<CategoryDto> GetCategory(int categoryId)
        {
            return Mapper.Map<CategoryDto>(await Repository.Get().SingleOrDefaultAsync(x => x.Id == categoryId));
        }

        public async Task<IList<CategoryDto>> GetDashboard()
        {
            var list = await Repository.Get().Include(x => x.Products).OrderBy(x => x.Name).ToListAsync();

            var result = Mapper.Map<IList<Category>, IList<CategoryDto>>(list);

            return result;
        }
    }
}
