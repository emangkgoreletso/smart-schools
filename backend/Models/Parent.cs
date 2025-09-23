namespace backend.Models
{
    public class Parent : User
    {
        public string PhoneNumber { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public List<Student> Children { get; set; } = new();
    }
}
