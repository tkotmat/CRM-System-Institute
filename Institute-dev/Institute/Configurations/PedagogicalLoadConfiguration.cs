using Institute.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Institute.Configurations
{
    public class PedagogicalLoadConfiguration : IEntityTypeConfiguration<PedagogicalLoadEntity>
    {
        public void Configure(EntityTypeBuilder<PedagogicalLoadEntity> builder)
        {
            builder.HasKey(pl => new { pl.Discipline, pl.GroupNumber, pl.PassportNumber });
        }
    }
}
