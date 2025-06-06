using AutoMapper;
using AutoMapper.QueryableExtensions;
using Institute.Data;
using Institute.DTOs;
using Institute.Entity;
using Microsoft.EntityFrameworkCore;

namespace Institute.Repositories
{
    public class PedagogicalLoadRepositories : IPedagogicalLoadRepositories
    {
        public readonly ApplicationDbContext _dbContext;
        public readonly IMapper _mapper;

        public PedagogicalLoadRepositories(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<IEnumerable<PedagogicalLoadDto>> Get()
        {
            return await _dbContext.PedagogicalLoads
                .ProjectTo<PedagogicalLoadDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<PedagogicalLoadDto?> GetByKeys(string discipline, int groupNumber, int passportNumber)
        {
            var pedagogicalLoad = await _dbContext.PedagogicalLoads.FindAsync(discipline, groupNumber, passportNumber);
            return pedagogicalLoad == null ? null : _mapper.Map<PedagogicalLoadDto>(pedagogicalLoad);
        }

        public async Task<PedagogicalLoadDto> Create(PedagogicalLoadDto dto)
        {
            var pedagogicalLoad = _mapper.Map<PedagogicalLoadEntity>(dto);
            var exists = await _dbContext.PedagogicalLoads.AnyAsync(pl => 
                pl.Discipline == pedagogicalLoad.Discipline &&
                pl.GroupNumber == pedagogicalLoad.GroupNumber &&
                pl.PassportNumber == pedagogicalLoad.PassportNumber);

            if (exists)
                throw new InvalidOperationException("Запись с такими ключами уже существует.");

            _dbContext.PedagogicalLoads.Add(pedagogicalLoad);
            await _dbContext.SaveChangesAsync();

            return _mapper.Map<PedagogicalLoadDto>(pedagogicalLoad);
        }
        public async Task<bool> Update(PedagogicalLoadDto dto)
        {
            var pedagogicalLoad = await _dbContext.PedagogicalLoads.FindAsync(dto.Discipline, dto.GroupNumber, dto.PassportNumber);
            if (pedagogicalLoad == null)
                return false;

            _mapper.Map(dto, pedagogicalLoad);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Delete(string discipline, int groupNumber, int passportNumber)
        {
            var pedagogicalLoad = await _dbContext.PedagogicalLoads.FindAsync(discipline, groupNumber, passportNumber);
            if (pedagogicalLoad == null) return false;

            _dbContext.PedagogicalLoads.Remove(pedagogicalLoad);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
