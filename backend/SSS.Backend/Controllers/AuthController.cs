using Microsoft.AspNetCore.Mvc;
using SSS.Backend.Application.DTOs;
using SSS.Backend.Application.Interfaces;

namespace SSS.Backend.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDTO dto)
    {
        var result = await _authService.Login(dto);
        return Ok(result);
    }
}