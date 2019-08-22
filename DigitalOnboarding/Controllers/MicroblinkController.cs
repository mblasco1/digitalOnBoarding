using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DigitalOnboarding.Controllers
{
    [Route("api/[controller]/recognize/execute")]
    [ApiController]
    public class MicroblinkController : ControllerBase
    {
        [HttpPost]
        public async Task Execute([FromServices] IHttpClientFactory httpClientFactory)
        {
            var httpClient = httpClientFactory.CreateClient();
            using (var streamContent = new StreamContent(Request.Body))
            using (var requestMessage = new HttpRequestMessage(HttpMethod.Post, new Uri("https://api.microblink.com/recognize/execute")))
            {
                requestMessage.Content = streamContent;
                requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", "OWMzYzA4ODI1MTQ0NDdlMjk3MGQ2NmIzZDM4OTE5YTE6ZTA0MDZkZWItYzVhMC00OTJjLTgzYWYtZDExNWM5NDA0YTI3");
				requestMessage.Content.Headers.Add("Content-Type", "application/json");
                

                var response = await httpClient.SendAsync(requestMessage);
                var content = await response.Content.ReadAsStringAsync();

                Response.StatusCode = (int)response.StatusCode;
                Response.ContentType = response.Content.Headers.ContentType?.ToString();
                Response.ContentLength = response.Content.Headers.ContentLength;

                await Response.WriteAsync(content);
            }
        }
    }
}