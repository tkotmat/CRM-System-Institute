using Institute.Configurations;
using Institute.Entity;
using Microsoft.EntityFrameworkCore;

namespace Institute.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<DepartmentEntity> Departments { get; set; }
        public DbSet<EmployeeEntity> Employees { get; set; }
        public DbSet<PedagogicalLoadEntity> PedagogicalLoads { get; set; }
        public DbSet<PhoneEmployeeEntity> PhoneEmployees { get; set; }
        public DbSet<ReferencesEntity> References { get; set; }
        public DbSet<VacationEntity> Vacations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new DepartmentConfiguration());
            modelBuilder.ApplyConfiguration(new EmployeeConfiguration());
            modelBuilder.ApplyConfiguration(new PedagogicalLoadConfiguration());
            modelBuilder.ApplyConfiguration(new PhoneEmployeeConfiguration());
            modelBuilder.ApplyConfiguration(new ReferencesConfigurations());
            modelBuilder.ApplyConfiguration(new VacationConfigurations());

            base.OnModelCreating(modelBuilder);
            SeedData.Seed(modelBuilder);
        }
    }
}
