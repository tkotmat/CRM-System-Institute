using AutoMapper;
using AutoMapper.QueryableExtensions;
using Institute.Data;
using Institute.DTOs;
using Institute.Entity;
using Microsoft.EntityFrameworkCore;


namespace Institute.Repositories
{
    public class VacationRepositories : IVacationRepositories
    {
        public readonly ApplicationDbContext _dbContext;
        public readonly IMapper _mapper;

        public VacationRepositories(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<IEnumerable<VacationDto>> Get()
        {
            return await _dbContext.Vacations
                .ProjectTo<VacationDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<VacationDto?> GetByKeys(string vacationType, int passportNumber)
        {
            var vacation = await _dbContext.Vacations.FindAsync(vacationType, passportNumber);
            return vacation == null ? null : _mapper.Map<VacationDto>(vacation);
        }

        public async Task<VacationDto> Create(VacationDto dto)
        {
            var vacation = _mapper.Map<VacationEntity>(dto);
            var exists = await _dbContext.Vacations.AnyAsync(v =>
                v.VacationType == vacation.VacationType &&
                v.PassportNumber == vacation.PassportNumber);

            if (exists)
                throw new InvalidOperationException("Запись с номером уже существует.");

            _dbContext.Vacations.Add(vacation);
            await _dbContext.SaveChangesAsync();

            return _mapper.Map<VacationDto>(vacation);
        }
        public async Task<bool> Update(VacationDto dto)
        {
            var vacation = await _dbContext.PhoneEmployees.FindAsync(dto.VacationType, dto.PassportNumber);
            if (vacation == null)
                return false;

            _mapper.Map(dto, vacation);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Delete(string vacationType, int passportNumber)
        {
            var vacation = await _dbContext.Vacations.FindAsync(vacationType, passportNumber);
            if (vacation == null) return false;

            _dbContext.Vacations.Remove(vacation);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
