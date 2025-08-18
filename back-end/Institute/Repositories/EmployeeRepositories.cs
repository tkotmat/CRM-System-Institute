using AutoMapper;
using AutoMapper.QueryableExtensions;
using Institute.Data;
using Institute.DTOs;
using Institute.Entity;
using Microsoft.EntityFrameworkCore;

namespace Institute.Repositories
{
    public class EmployeeRepositories : IEmployeeRepositories
    {
        public readonly ApplicationDbContext _dbContext;
        public readonly IMapper _mapper;

        public EmployeeRepositories(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<EmployeeDto>> Get()
        {
            return await _dbContext.Employees
                .ProjectTo<EmployeeDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<EmployeeDto?> GetByPassportNumber(int passportNumber)
        {
            var employee = await _dbContext.Employees.FindAsync(passportNumber);
            return employee == null ? null : _mapper.Map<EmployeeDto>(employee);
        }

        public async Task<EmployeeDto> Create(EmployeeDto dto)
        {
            var employee = _mapper.Map<EmployeeEntity>(dto);
            var exists = await _dbContext.Employees.AnyAsync(e => e.PassportNumber == employee.PassportNumber);

            if (exists)
                throw new InvalidOperationException("Сотрудник с таким номером паспорта уже существует.");

            _dbContext.Employees.Add(employee);
            await _dbContext.SaveChangesAsync();

            return _mapper.Map<EmployeeDto>(employee);
        }
        public async Task<bool> Update(EmployeeDto dto)
        {
            var employee = await _dbContext.Employees.FindAsync(dto.PassportNumber);
            if (employee == null)
                return false;

            _mapper.Map(dto, employee);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Delete(int passportNumber)
        {
            var employee = await _dbContext.Employees.FindAsync(passportNumber);
            if (employee == null) return false;

            _dbContext.Employees.Remove(employee);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
