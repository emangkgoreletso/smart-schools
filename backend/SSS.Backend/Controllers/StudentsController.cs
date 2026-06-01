using Microsoft.AspNetCore.Mvc;
using SSS.Backend.Application.Interfaces;

namespace SSS.Backend.Controllers;

[ApiController]
[Route("api/students")]
public class StudentsController : ControllerBase
{
    private readonly IStudentService _service;

    public StudentsController(IStudentService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetStudents()
    {
        return Ok(await _service.GetStudents());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetStudent(Guid id)
    {
        return Ok(await _service.GetStudent(id));
    }
}