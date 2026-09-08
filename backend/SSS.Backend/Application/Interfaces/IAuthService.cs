using SSS.Backend.Application.DTOs;

namespace SSS.Backend.Application.Interfaces;

public interface IAuthService
{
    Task<string> Login(LoginDTO dto);
}