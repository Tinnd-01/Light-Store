using AutoMapper;

namespace SaleLightBulb.Infrastructure.MappingProfiles
{
    public abstract class BaseMappingProfile : Profile
    {
        protected BaseMappingProfile(string name) : base(name)
        {

        }
    }

    public abstract class BaseMappingProfile<T> : BaseMappingProfile
    {
        protected BaseMappingProfile() : base(typeof(T).Name)
        {

        }
    }
}
