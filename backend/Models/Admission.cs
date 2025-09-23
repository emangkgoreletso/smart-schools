namespace backend.Models
{
    public class Admission
    {
        public int Id { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public string GuardianName { get; set; } = string.Empty;
        public string ContactInfo { get; set; } = string.Empty;
        public string PreviousSchool { get; set; } = string.Empty;
        public string GradeApplied { get; set; } = string.Empty;
        public DateTime ApplicationDate { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "Pending"; // Pending, Accepted, Rejected, Transferred
        public DateTime? DecisionDate { get; set; }
    }
}
