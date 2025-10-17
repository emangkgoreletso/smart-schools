using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost("register")]
        public IActionResult Register([FromBody] object userDto)
        {
            // TODO: Add user registration logic
            return Ok(new { message = "User registered successfully" });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] object loginDto)
        {
            // TODO: Add login + JWT authentication logic
            return Ok(new { token = "fake-jwt-token" });
        }
    }
}
