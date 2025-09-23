namespace backend.Models
{
    public class Teacher : User
    {
        public string Subject { get; set; } = string.Empty;
        public string EmployeeId { get; set; } = string.Empty;
        public List<Assignment> Assignments { get; set; } = new();
    }
}
