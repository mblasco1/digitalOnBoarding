using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using DigitalOnboarding.Models;
using DigitalOnboarding.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DigitalOnboarding.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BioIdController : ControllerBase
    {
        [HttpGet("[action]")]
        public async Task<ActionResult<BioIdToken>> Token([FromServices] IBioIdClient bioId)
        {
            try
            {
                return await bioId.getTokenAsync(); // might be null. Handle?
            }
            catch (Exception)
            {
                return null;
            }
        }

        [HttpPost("[action]")]
        public async Task<Result> PhotoVerify([FromServices] IBioIdClient bioId, [FromBody] PhotoVerifyImages images)
        {
            return await bioId.PhotoVerifyAsync(images);
        }
    }
}