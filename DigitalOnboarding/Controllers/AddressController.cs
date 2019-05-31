using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DigitalOnboarding.Models;
using DigitalOnboarding.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DigitalOnboarding.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        [HttpPost("verify")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<Result>> VerifyForm([FromServices] IAddressChecker addressChecker, [FromForm]Address address)
        {
            return await addressChecker.VerifyAsync(address);
        }

        [HttpPost("verify")]
        [Consumes("application/json")]
        public async Task<ActionResult<Result>> VerifyBody([FromServices] IAddressChecker addressChecker, [FromBody]Address address)
        {
            return await addressChecker.VerifyAsync(address);
        }
    }
}