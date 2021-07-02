using AutoMapper;
using Domain;
namespace Application.Core
{
    public class MappingProfile
    {
        public class MappingProfiles : Profile
        {
            public MappingProfiles()
            {
                CreateMap<Ativity, Ativity>();
            }
        }
    }
}