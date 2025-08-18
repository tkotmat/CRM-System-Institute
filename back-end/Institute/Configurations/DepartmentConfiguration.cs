using Institute.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Institute.Configurations
{
    public class DepartmentConfiguration : IEntityTypeConfiguration<DepartmentEntity>
    {
        public void Configure(EntityTypeBuilder<DepartmentEntity> builder) 
        {
            builder.HasKey(d => d.DepartmentName);

            builder
                .HasMany(d => d.Employees)
                .WithOne(e => e.Department)
                .HasForeignKey(e => e.DepartmentName);

            builder
                .HasMany(d => d.PedagogicalLoads)
                .WithOne(pl => pl.Department)
                .HasForeignKey(pl => pl.DepartmentName);
        }
    }
}
