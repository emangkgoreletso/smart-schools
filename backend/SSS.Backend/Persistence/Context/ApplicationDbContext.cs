using Microsoft.EntityFrameworkCore;
using SSS.Backend.Models;

namespace SSS.Backend.Persistence.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // =========================
        // FOUNDATION
        // =========================
        public DbSet<School> Schools { get; set; }
        public DbSet<User> Users { get; set; }

        // =========================
        // PEOPLE
        // =========================
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Parent> Parents { get; set; }
        public DbSet<Staff> Staff { get; set; }
        public DbSet<StudentParent> StudentParents { get; set; }

        // =========================
        // ACADEMIC STRUCTURE
        // =========================
        public DbSet<Class> Classes { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<ClassSubject> ClassSubjects { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }

        // =========================
        // LEARNING
        // =========================
        public DbSet<Assessment> Assessments { get; set; }
        public DbSet<Submission> Submissions { get; set; }
        
        public DbSet<Mark> Marks { get; set; }
        public DbSet<Attendance> Attendance { get; set; }

        // =========================
        // FINANCE
        // =========================
        public DbSet<Fee> Fees { get; set; }
        public DbSet<StudentFee> StudentFees { get; set; }
        public DbSet<Payment> Payments { get; set; }
        
        public DbSet<PaymentTransaction> PaymentTransactions { get; set; }

        // =========================
        // COMMUNICATION
        // =========================
        public DbSet<Notice> Notices { get; set; }
        public DbSet<Message> Messages { get; set; }

        // =========================
        // SYSTEM / SECURITY
        // =========================
        public DbSet<AuditLog> AuditLogs { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // =========================
            // STUDENT - PARENT (Many-to-Many)
            // =========================
            modelBuilder.Entity<StudentParent>()
                .HasOne<Student>()
                .WithMany()
                .HasForeignKey(sp => sp.StudentId);

            modelBuilder.Entity<StudentParent>()
                .HasOne<Parent>()
                .WithMany()
                .HasForeignKey(sp => sp.ParentId);

            // =========================
            // CLASS TEACHER RELATION
            // =========================
            modelBuilder.Entity<Class>()
                .HasOne<Teacher>()
                .WithMany()
                .HasForeignKey(c => c.ClassTeacherId)
                .OnDelete(DeleteBehavior.Restrict);

            // =========================
            // CLASS SUBJECT RELATION
            // =========================
            modelBuilder.Entity<ClassSubject>()
                .HasOne<Class>()
                .WithMany()
                .HasForeignKey(cs => cs.ClassId);

            modelBuilder.Entity<ClassSubject>()
                .HasOne<Subject>()
                .WithMany()
                .HasForeignKey(cs => cs.SubjectId);

            modelBuilder.Entity<ClassSubject>()
                .HasOne<Teacher>()
                .WithMany()
                .HasForeignKey(cs => cs.TeacherId);

            // =========================
            // ENROLLMENTS
            // =========================
            modelBuilder.Entity<Enrollment>()
                .HasOne<Student>()
                .WithMany()
                .HasForeignKey(e => e.StudentId);

            modelBuilder.Entity<Enrollment>()
                .HasOne<Class>()
                .WithMany()
                .HasForeignKey(e => e.ClassId);

            // =========================
            // ASSESSMENTS
            // =========================
            modelBuilder.Entity<Assessment>()
                .HasOne<Subject>()
                .WithMany()
                .HasForeignKey(a => a.SubjectId);

            modelBuilder.Entity<Assessment>()
                .HasOne<Class>()
                .WithMany()
                .HasForeignKey(a => a.ClassId);

            modelBuilder.Entity<Assessment>()
                .HasOne<Teacher>()
                .WithMany()
                .HasForeignKey(a => a.TeacherId);

            // =========================
            // MARKS
            // =========================
            modelBuilder.Entity<Mark>()
                .HasOne<Student>()
                .WithMany()
                .HasForeignKey(m => m.StudentId);

            modelBuilder.Entity<Mark>()
                .HasOne<Assessment>()
                .WithMany()
                .HasForeignKey(m => m.AssessmentId);

            // =========================
            // ATTENDANCE
            // =========================
            modelBuilder.Entity<Attendance>()
                .HasOne<Student>()
                .WithMany()
                .HasForeignKey(a => a.StudentId);

            modelBuilder.Entity<Attendance>()
                .HasOne<Class>()
                .WithMany()
                .HasForeignKey(a => a.ClassId);

            // =========================
            // FINANCE RELATIONS
            // =========================
            modelBuilder.Entity<Fee>()
                .HasOne<Class>()
                .WithMany()
                .HasForeignKey(f => f.ClassId);

            modelBuilder.Entity<StudentFee>()
                .HasOne<Student>()
                .WithMany()
                .HasForeignKey(sf => sf.StudentId);

            modelBuilder.Entity<StudentFee>()
                .HasOne<Fee>()
                .WithMany()
                .HasForeignKey(sf => sf.FeeId);

            modelBuilder.Entity<Payment>()
                .HasOne<Student>()
                .WithMany()
                .HasForeignKey(p => p.StudentId);

            modelBuilder.Entity<PaymentTransaction>()
                .HasOne<Payment>()
                .WithMany()
                .HasForeignKey(pt => pt.PaymentId);

            // =========================
            // SCHOOL ISOLATION (Multi-Tenant Safety)
            // =========================
            modelBuilder.Entity<User>()
                .HasOne<School>()
                .WithMany()
                .HasForeignKey(u => u.SchoolId);

            modelBuilder.Entity<Student>()
                .HasOne<School>()
                .WithMany()
                .HasForeignKey(s => s.SchoolId);

            modelBuilder.Entity<Teacher>()
                .HasOne<School>()
                .WithMany()
                .HasForeignKey(t => t.SchoolId);

            modelBuilder.Entity<Parent>()
                .HasOne<School>()
                .WithMany()
                .HasForeignKey(p => p.SchoolId);

            modelBuilder.Entity<Class>()
                .HasOne<School>()
                .WithMany()
                .HasForeignKey(c => c.SchoolId);
        }
    }
}