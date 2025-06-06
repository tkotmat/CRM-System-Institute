using Institute.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Institute.Configurations
{
    public class PhoneEmployeeConfiguration : IEntityTypeConfiguration<PhoneEmployeeEntity>
    {
        public void Configure(EntityTypeBuilder<PhoneEmployeeEntity> builder)
        {
            builder.HasKey(pe => new { pe.PhoneNumber, pe.PassportNumber });
        }
    }
}
