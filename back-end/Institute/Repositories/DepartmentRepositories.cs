using AutoMapper;
using AutoMapper.QueryableExtensions;
using Institute.Data;
using Institute.DTOs;
using Institute.Entity;
using Microsoft.EntityFrameworkCore;

namespace Institute.Repositories
{
    public class DepartmentRepositories : IDepartmentRepositories
    {
        private ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public DepartmentRepositories(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<DepartmentDto>> Get()
        {
            return await _dbContext.Departments
                .ProjectTo<DepartmentDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<DepartmentDto?> GetByName(string departmentName)
        {
            var department = await _dbContext.Departments.FindAsync(departmentName);
            return department == null ? null : _mapper.Map<DepartmentDto>(department);
        }

        public async Task<DepartmentDto> Create(DepartmentDto dto)
        {
            var department = _mapper.Map<DepartmentEntity>(dto);
            var exists = await _dbContext.Departments.AnyAsync(d => d.DepartmentName == department.DepartmentName);

            if (exists)
                throw new InvalidOperationException("Кафедра с таким названием уже существует.");

            _dbContext.Departments.Add(department);
            await _dbContext.SaveChangesAsync();

            return _mapper.Map<DepartmentDto>(department);
        }
        public async Task<bool> Update(DepartmentDto dto)
        {
            var department = await _dbContext.Departments.FindAsync(dto.DepartmentName);
            if (department == null)
                return false;

            _mapper.Map(dto, department);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Delete(string departmentName)
        {
            var department = await _dbContext.Departments.FindAsync(departmentName);
            if (department == null) return false;

            _dbContext.Departments.Remove(department);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
