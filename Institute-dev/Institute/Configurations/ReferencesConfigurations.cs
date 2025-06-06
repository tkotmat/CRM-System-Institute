using Institute.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Institute.Configurations
{
    public class ReferencesConfigurations : IEntityTypeConfiguration<ReferencesEntity>
    {
        public void Configure(EntityTypeBuilder<ReferencesEntity> builder)
        {
            builder.HasKey(r => r.Id);


            builder
                .HasOne(r => r.Employee)
                .WithMany(e => e.References)
                .HasForeignKey(r => r.PassportNumber);
        }
    }
}
