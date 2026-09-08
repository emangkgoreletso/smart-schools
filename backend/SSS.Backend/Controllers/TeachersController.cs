using Microsoft.AspNetCore.Mvc;
using SSS.Backend.Application.Interfaces;

namespace SSS.Backend.Controllers;

[ApiController]
[Route("api/teachers")]
public class TeachersController : ControllerBase
{
    private readonly ITeacherService _service;

    public TeachersController(ITeacherService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetTeachers()
    {
        return Ok(await _service.GetTeachers());
    }
}