using Institute.Data;
using Institute.Entity;
using Institute.Repositories;
using Microsoft.EntityFrameworkCore;

public class AccessRepositories : IAccessRepositories
{
    private ApplicationDbContext _dbContext;

    public AccessRepositories(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    public async Task<CrmAccessEntity?> GetAccessCodeAsync()
    {
        return await _dbContext.CrmAccess.FirstOrDefaultAsync(c => c.Id == 1);
    }
}