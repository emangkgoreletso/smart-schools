using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // ✅ DbSets for all entities
        public DbSet<User> Users { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Parent> Parents { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<Submission> Submissions { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<TestResult> TestResults { get; set; }
        public DbSet<Admission> Admissions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ✅ Student → Submission (one-to-many)
            modelBuilder.Entity<Student>()
                .HasMany(s => s.Submissions)
                .WithOne()
                .HasForeignKey(s => s.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            // ✅ Student → TestResult (one-to-many)
            modelBuilder.Entity<Student>()
                .HasMany(s => s.TestResults)
                .WithOne()
                .HasForeignKey(r => r.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            // ✅ Teacher → Assignment (one-to-many)
            modelBuilder.Entity<Teacher>()
                .HasMany(t => t.Assignments)
                .WithOne()
                .HasForeignKey(a => a.TeacherId)
                .OnDelete(DeleteBehavior.Restrict);

            // ✅ Assignment → Submission (one-to-many)
            modelBuilder.Entity<Submission>()
                .HasOne(s => s.Assignment)
                .WithMany(a => a.Submissions)
                .HasForeignKey(s => s.AssignmentId)
                .OnDelete(DeleteBehavior.Cascade);

            // ✅ Test embeds TestQuestion as value object
            modelBuilder.Entity<Test>()
                .OwnsMany(t => t.Questions);

            // ✅ Payment precision fix
            modelBuilder.Entity<Payment>()
                .Property(p => p.Amount)
                .HasPrecision(18, 2);
        }
    }
}
