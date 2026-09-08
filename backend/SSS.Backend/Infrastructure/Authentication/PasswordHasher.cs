using System.Security.Cryptography;
using System.Text;

namespace SSS.Backend.Infrastructure.Authentication;

public class PasswordHasher
{
    public string Hash(string password)
    {
        using var sha = SHA256.Create();
        var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes);
    }
}