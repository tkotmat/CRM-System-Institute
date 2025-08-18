using Institute.DTOs;
using Institute.Entity;

namespace Institute.Repositories
{
    public interface IDepartmentRepositories
    {
        Task<IEnumerable<DepartmentDto>> Get();
        Task<DepartmentDto?> GetByName(string departmentName);
        Task<DepartmentDto> Create(DepartmentDto dto);
        Task<bool> Update(DepartmentDto dto);
        Task<bool> Delete(string departmentName);

    }
    public interface IEmployeeRepositories
    {
        Task<IEnumerable<EmployeeDto>> Get();
        Task<EmployeeDto?> GetByPassportNumber(int passportNumber);
        Task<EmployeeDto> Create(EmployeeDto dto);
        Task<bool> Update(EmployeeDto dto);
        Task<bool> Delete(int passportNumber);
    }
    public interface IPedagogicalLoadRepositories
    {
        Task<IEnumerable<PedagogicalLoadDto>> Get();
        Task<PedagogicalLoadDto?> GetByKeys(string discipline, int groupNumber, int passportNumber);
        Task<PedagogicalLoadDto> Create(PedagogicalLoadDto dto);
        Task<bool> Update(PedagogicalLoadDto dto);
        Task<bool> Delete(string discipline, int groupNumber, int passportNumber);
    }
    public interface IPhoneEmployeeRepositories
    {
        Task<IEnumerable<PhoneEmployeeDto>> Get();
        Task<PhoneEmployeeDto?> GetByKeys(string phoneNumber, int passportNumber);
        Task<PhoneEmployeeDto> Create(PhoneEmployeeDto dto);
        Task<bool> Update(PhoneEmployeeDto dto);
        Task<bool> Delete(string phoneNumber, int passportNumber);
    }
    public interface IReferencesRepositories
    {
        Task<IEnumerable<ReferencesDto>> Get();
        Task<ReferencesDto?> GetById(Guid id);
        Task<ReferencesDto> Create(ReferencesDto dto);
        Task<bool> Update(ReferencesDto dto);
        Task<bool> Delete(Guid id);
    }
    public interface IVacationRepositories
    {
        Task<IEnumerable<VacationDto>> Get();
        Task<VacationDto?> GetByKeys(string vacationType, int passportNumber);
        Task<VacationDto> Create(VacationDto dto);
        Task<bool> Update(VacationDto dto);
        Task<bool> Delete(string vacationType, int passportNumber);
    }

    public interface IAccessRepositories
    {
        Task<CrmAccessEntity?> GetAccessCodeAsync();
    }
}
