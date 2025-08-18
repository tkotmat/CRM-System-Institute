using Institute.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Institute.Configurations
{
    public class EmployeeConfiguration : IEntityTypeConfiguration<EmployeeEntity>
    {
        public void Configure(EntityTypeBuilder<EmployeeEntity> builder)
        {
            builder.HasKey(e => e.PassportNumber);

            builder
                .HasMany(e => e.Vacations)
                .WithOne(v => v.Employee)
                .HasForeignKey(v => v.PassportNumber);

            builder
                .HasMany(e => e.PhoneEmployees)
                .WithOne(pe => pe.Employee)
                .HasForeignKey(pe => pe.PassportNumber);

            builder
                .HasMany(e => e.References)
                .WithOne(r => r.Employee)
                .HasForeignKey(r => r.PassportNumber);

            builder
                .HasMany(e => e.PedagogicalLoads)
                .WithOne(pl => pl.Employee)
                .HasForeignKey(pl => pl.PassportNumber);
        }
    }
}
