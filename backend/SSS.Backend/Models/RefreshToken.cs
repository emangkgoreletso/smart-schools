namespace SSS.Backend.Models
{
    public class RefreshToken
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public string Token { get; set; }

        public DateTime ExpiryDate { get; set; }
    }
}