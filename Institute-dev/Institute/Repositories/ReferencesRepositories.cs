using AutoMapper;
using AutoMapper.QueryableExtensions;
using Institute.Data;
using Institute.DTOs;
using Institute.Entity;
using Microsoft.EntityFrameworkCore;

namespace Institute.Repositories
{
    public class ReferencesRepositories : IReferencesRepositories
    {
        private ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public ReferencesRepositories(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ReferencesDto>> Get()
        {
            return await _dbContext.References
                .ProjectTo<ReferencesDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<ReferencesDto?> GetById(Guid id)
        {
            var references = await _dbContext.References.FindAsync(id);
            return references == null ? null : _mapper.Map<ReferencesDto>(references);
        }

        public async Task<ReferencesDto> Create(ReferencesDto dto)
        {
            var references = _mapper.Map<ReferencesEntity>(dto);
            references.Id = Guid.NewGuid();

            _dbContext.References.Add(references);
            await _dbContext.SaveChangesAsync();

            return _mapper.Map<ReferencesDto>(references);
        }
        public async Task<bool> Update(ReferencesDto dto)
        {
            var references = await _dbContext.References.FindAsync(dto.Id);
            if (references == null)
                return false;

            _mapper.Map(dto, references);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Delete(Guid id)
        {
            var references = await _dbContext.References.FindAsync(id);
            if (references == null) return false;

            _dbContext.References.Remove(references);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
