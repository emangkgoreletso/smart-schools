using Microsoft.AspNetCore.Mvc;
using SSS.Backend.Application.Interfaces;

namespace SSS.Backend.Controllers;

[ApiController]
[Route("api/payments")]
public class PaymentsController : ControllerBase
{
    private readonly IPaymentService _service;

    public PaymentsController(IPaymentService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetPayments()
    {
        return Ok(await _service.GetPayments());
    }
}