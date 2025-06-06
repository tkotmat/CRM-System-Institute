using AutoMapper;
using Institute.Entity;
namespace Institute.DTOs
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<DepartmentEntity, DepartmentDto>().ReverseMap();
            CreateMap<EmployeeEntity, EmployeeDto>().ReverseMap();
            CreateMap<PedagogicalLoadEntity, PedagogicalLoadDto>().ReverseMap();
            CreateMap<PhoneEmployeeEntity, PhoneEmployeeDto>().ReverseMap();
            CreateMap<ReferencesEntity, ReferencesDto>().ReverseMap();
            CreateMap<VacationEntity, VacationDto>().ReverseMap();
        }
    }
}
