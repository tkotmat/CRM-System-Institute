using AutoMapper;
using AutoMapper.QueryableExtensions;
using Institute.Data;
using Institute.DTOs;
using Institute.Entity;
using Microsoft.EntityFrameworkCore;


namespace Institute.Repositories
{
    public class PhoneEmployeeRepositories : IPhoneEmployeeRepositories
    {
        public readonly ApplicationDbContext _dbContext;
        public readonly IMapper _mapper;

        public PhoneEmployeeRepositories(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PhoneEmployeeDto>> Get()
        {
            return await _dbContext.PhoneEmployees
                .ProjectTo<PhoneEmployeeDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<PhoneEmployeeDto?> GetByKeys(string phoneNumber, int passportNumber)
        {
            var phoneEmployee = await _dbContext.PhoneEmployees.FindAsync(phoneNumber, passportNumber);
            return phoneEmployee == null ? null : _mapper.Map<PhoneEmployeeDto>(phoneEmployee);
        }

        public async Task<PhoneEmployeeDto> Create(PhoneEmployeeDto dto)
        {
            var phoneEmployee = _mapper.Map<PhoneEmployeeEntity>(dto);
            var exists = await _dbContext.PhoneEmployees.AnyAsync(pe =>
                pe.PhoneNumber == phoneEmployee.PhoneNumber &&
                pe.PassportNumber == phoneEmployee.PassportNumber);

            if (exists)
                throw new InvalidOperationException("Запись с номером уже существует.");

            _dbContext.PhoneEmployees.Add(phoneEmployee);
            await _dbContext.SaveChangesAsync();

            return _mapper.Map<PhoneEmployeeDto>(phoneEmployee);
        }
        public async Task<bool> Update(PhoneEmployeeDto dto)
        {
            var phoneEmployee = await _dbContext.PhoneEmployees.FindAsync(dto.PhoneNumber, dto.PassportNumber);
            if (phoneEmployee == null)
                return false;

            _mapper.Map(dto, phoneEmployee);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Delete(string phoneNumber, int passportNumber)
        {
            var phoneEmployee = await _dbContext.PhoneEmployees.FindAsync(phoneNumber, passportNumber);
            if (phoneEmployee == null) return false;

            _dbContext.PhoneEmployees.Remove(phoneEmployee);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
