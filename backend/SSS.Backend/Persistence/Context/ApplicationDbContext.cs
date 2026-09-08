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
        // STUDENT - PARENT
        // =========================
        modelBuilder.Entity<StudentParent>()
            .HasOne(sp => sp.Student)
            .WithMany(s => s.StudentParents)
            .HasForeignKey(sp => sp.StudentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<StudentParent>()
            .HasOne(sp => sp.Parent)
            .WithMany(p => p.StudentParents)
            .HasForeignKey(sp => sp.ParentId)
            .OnDelete(DeleteBehavior.Cascade);

        // =========================
        // CLASS - TEACHER
        // =========================
        modelBuilder.Entity<Class>()
            .HasOne(c => c.ClassTeacher)
            .WithMany(t => t.Classes)
            .HasForeignKey(c => c.ClassTeacherId)
            .OnDelete(DeleteBehavior.Restrict);

        // =========================
        // CLASS SUBJECT
        // =========================
        modelBuilder.Entity<ClassSubject>()
            .HasOne(cs => cs.Class)
            .WithMany(c => c.ClassSubjects)
            .HasForeignKey(cs => cs.ClassId);

        modelBuilder.Entity<ClassSubject>()
            .HasOne(cs => cs.Subject)
            .WithMany(s => s.ClassSubjects)
            .HasForeignKey(cs => cs.SubjectId);

        modelBuilder.Entity<ClassSubject>()
            .HasOne(cs => cs.Teacher)
            .WithMany(t => t.ClassSubjects)
            .HasForeignKey(cs => cs.TeacherId);

        // =========================
        // ENROLLMENTS
        // =========================
        modelBuilder.Entity<Enrollment>()
            .HasOne(e => e.Student)
            .WithMany(s => s.Enrollments)
            .HasForeignKey(e => e.StudentId);

        modelBuilder.Entity<Enrollment>()
            .HasOne(e => e.Subject)
            .WithMany(s => s.Enrollments)
            .HasForeignKey(e => e.SubjectId);

        // =========================
        // ASSESSMENTS
        // =========================
        modelBuilder.Entity<Assessment>()
            .HasOne(a => a.Subject)
            .WithMany(s => s.Assessments)
            .HasForeignKey(a => a.SubjectId);

        modelBuilder.Entity<Assessment>()
            .HasOne(a => a.Class)
            .WithMany(c => c.Assessments)
            .HasForeignKey(a => a.ClassId);

        modelBuilder.Entity<Assessment>()
            .HasOne(a => a.Teacher)
            .WithMany(t => t.Assessments)
            .HasForeignKey(a => a.TeacherId);

        // =========================
        // SUBMISSIONS
        // =========================
        modelBuilder.Entity<Submission>()
            .HasOne(s => s.Assessment)
            .WithMany(a => a.Submissions)
            .HasForeignKey(s => s.AssessmentId);

        modelBuilder.Entity<Submission>()
            .HasOne(s => s.Student)
            .WithMany(st => st.Submissions)
            .HasForeignKey(s => s.StudentId);

        // =========================
        // MARKS
        // =========================
        modelBuilder.Entity<Mark>()
            .HasOne(m => m.Student)
            .WithMany(s => s.Marks)
            .HasForeignKey(m => m.StudentId);

        modelBuilder.Entity<Mark>()
            .HasOne(m => m.Assessment)
            .WithMany(a => a.Marks)
            .HasForeignKey(m => m.AssessmentId);

        // =========================
        // ATTENDANCE
        // =========================
        modelBuilder.Entity<Attendance>()
            .HasOne(a => a.Student)
            .WithMany(s => s.AttendanceRecords)
            .HasForeignKey(a => a.StudentId);

        modelBuilder.Entity<Attendance>()
            .HasOne(a => a.Class)
            .WithMany(c => c.AttendanceRecords)
            .HasForeignKey(a => a.ClassId);

        // =========================
        // FINANCE
        // =========================
        modelBuilder.Entity<Fee>()
            .HasOne(f => f.School)
            .WithMany(s => s.Fees)
            .HasForeignKey(f => f.SchoolId);

        modelBuilder.Entity<Fee>()
            .HasOne(f => f.Class)
            .WithMany(c => c.Fees)
            .HasForeignKey(f => f.ClassId);

        modelBuilder.Entity<StudentFee>()
            .HasOne(sf => sf.Student)
            .WithMany(s => s.StudentFees)
            .HasForeignKey(sf => sf.StudentId);

        modelBuilder.Entity<StudentFee>()
            .HasOne(sf => sf.Fee)
            .WithMany(f => f.StudentFees)
            .HasForeignKey(sf => sf.FeeId);

        modelBuilder.Entity<Payment>()
            .HasOne(p => p.Student)
            .WithMany(s => s.Payments)
            .HasForeignKey(p => p.StudentId);

        modelBuilder.Entity<Payment>()
            .HasOne(p => p.StudentFee)
            .WithMany(sf => sf.Payments)
            .HasForeignKey(p => p.StudentFeeId);

        modelBuilder.Entity<PaymentTransaction>()
            .HasOne(pt => pt.Payment)
            .WithMany(p => p.Transactions)
            .HasForeignKey(pt => pt.PaymentId);

        // =========================
        // SCHOOL ISOLATION
        // =========================
        modelBuilder.Entity<User>()
            .HasOne(u => u.School)
            .WithMany(s => s.Users)
            .HasForeignKey(u => u.SchoolId);

        modelBuilder.Entity<Student>()
            .HasOne(s => s.School)
            .WithMany(school => school.Students)
            .HasForeignKey(s => s.SchoolId);

        modelBuilder.Entity<Teacher>()
            .HasOne(t => t.School)
            .WithMany(s => s.Teachers)
            .HasForeignKey(t => t.SchoolId);

        modelBuilder.Entity<Class>()
            .HasOne(c => c.School)
            .WithMany(s => s.Classes)
            .HasForeignKey(c => c.SchoolId);

        // =========================
        // USER RELATIONSHIPS
        // =========================
        modelBuilder.Entity<Parent>()
            .HasOne(p => p.User)
            .WithMany()
            .HasForeignKey(p => p.UserId);

        modelBuilder.Entity<Teacher>()
            .HasOne(t => t.User)
            .WithMany()
            .HasForeignKey(t => t.UserId);

        modelBuilder.Entity<Student>()
            .HasOne(s => s.User)
            .WithMany()
            .HasForeignKey(s => s.UserId);

        modelBuilder.Entity<Staff>()
            .HasOne(s => s.User)
            .WithMany()
            .HasForeignKey(s => s.UserId);

        modelBuilder.Entity<Staff>()
            .HasOne(s => s.School)
            .WithMany(school => school.StaffMembers)
            .HasForeignKey(s => s.SchoolId);

        // =========================
        // SECURITY
        // =========================
        modelBuilder.Entity<Session>()
            .HasOne(s => s.User)
            .WithMany(u => u.Sessions)
            .HasForeignKey(s => s.UserId);

        modelBuilder.Entity<RefreshToken>()
            .HasOne(rt => rt.User)
            .WithMany(u => u.RefreshTokens)
            .HasForeignKey(rt => rt.UserId);

        modelBuilder.Entity<AuditLog>()
            .HasOne(al => al.User)
            .WithMany(u => u.AuditLogs)
            .HasForeignKey(al => al.UserId);

        // =========================
        // NOTICE
        // =========================
        modelBuilder.Entity<Notice>()
            .HasOne(n => n.School)
            .WithMany(s => s.Notices)
            .HasForeignKey(n => n.SchoolId);

        modelBuilder.Entity<Notice>()
            .HasOne(n => n.CreatedByUser)
            .WithMany()
            .HasForeignKey(n => n.CreatedByUserId);

        // =========================
        // MESSAGES
        // =========================
        modelBuilder.Entity<Message>()
            .HasOne(m => m.Sender)
            .WithMany()
            .HasForeignKey(m => m.SenderId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Message>()
            .HasOne(m => m.Receiver)
            .WithMany()
            .HasForeignKey(m => m.ReceiverId)
            .OnDelete(DeleteBehavior.Restrict);

        // =========================
        // SUBSCRIPTIONS
        // =========================
        modelBuilder.Entity<Subscription>()
            .HasOne(s => s.School)
            .WithMany()
            .HasForeignKey(s => s.SchoolId);
    }
}
}
