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
        [HttpPost]
        public async Task<ActionResult<Result>> VerifyAddress([FromServices] IAddressChecker addressChecker, [FromForm]Address address)
        {
            return await addressChecker.Verify(address);
        }
    }
}