using SSS.Backend.Application.DTOs;
using SSS.Backend.Application.Interfaces;

namespace SSS.Backend.Application.Services;

public class AuthService : IAuthService
{
    public Task<string> Login(LoginDTO dto)
    {
        return Task.FromResult("JWT_TOKEN_PLACEHOLDER");
    }
}