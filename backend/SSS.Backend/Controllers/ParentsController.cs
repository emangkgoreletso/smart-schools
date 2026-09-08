using Microsoft.AspNetCore.Mvc;

namespace SSS.Backend.Controllers;

[ApiController]
[Route("api/parents")]
public class ParentsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetParents()
    {
        return Ok("Parents endpoint working");
    }
}