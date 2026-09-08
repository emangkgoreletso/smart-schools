using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SSS.Backend.Persistence.Configurations;

public class StudentConfiguration : IEntityTypeConfiguration<object>
{
    public void Configure(EntityTypeBuilder<object> builder)
    {
        builder.ToTable("Students");
    }
}