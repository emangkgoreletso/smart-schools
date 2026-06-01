using Microsoft.AspNetCore.Mvc;

namespace SSS.Backend.Controllers;

[ApiController]
[Route("api/notices")]
public class NoticesController : ControllerBase
{
    [HttpGet]
    public IActionResult GetNotices()
    {
        return Ok("Notices endpoint working");
    }
}