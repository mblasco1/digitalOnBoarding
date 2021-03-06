﻿using System;
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
                return StatusCode(500);
            }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<Result>> PhotoVerify([FromServices] IBioIdClient bioId, [FromBody] PhotoVerifyImages images)
        {
            (Result result, int statusCode, string response) = await bioId.PhotoVerifyAsync(images);
            if (result == null)
            {
                return StatusCode(statusCode, response);
            }
            return result;
        }

        public class ImageString
        {
            public string data { get; set; }
        }
    }
}