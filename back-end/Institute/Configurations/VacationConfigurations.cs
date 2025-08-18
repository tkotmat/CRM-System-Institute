using Institute.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Institute.Configurations
{
    public class VacationConfigurations : IEntityTypeConfiguration<VacationEntity>
    {
        public void Configure(EntityTypeBuilder<VacationEntity> builder)
        {
            builder.HasKey(v => new {v.VacationType, v.PassportNumber});
        }
    }
}
