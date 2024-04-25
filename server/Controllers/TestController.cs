using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;

[Route("api")]
[ApiController]
public class TestController : ControllerBase
{
    [HttpGet("public"), Authorize]
    public IActionResult Hello() 
    {
        return Ok("Acces permis dupa autentificare");
    }
}