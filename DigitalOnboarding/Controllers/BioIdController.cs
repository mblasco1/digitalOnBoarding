using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using DigitalOnboarding.Models;
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
        const string _appID = "9835d0c6-8985-4657-b6c8-b13f52752d18";
        const string _appSecret = "wgiVhwfNMoX6ZYlj1+lJNb5D";
        public async Task<ActionResult<string>> GetToken()
        {
            try
            {
                // well lets start by fetching a BWS token
                using (var httpClient = new HttpClient())
                {
                    string credentials = Convert.ToBase64String(Encoding.GetEncoding("iso-8859-1").GetBytes($"{_appID}:{_appSecret}"));
                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);
                    string query = $"token?id={_appID}&bcid=xxx&task=livenessdetection&livedetection=true&challenge=false&autoenroll=false";

                    var ApiUrl = "https://bws.bioid.com/extension/";
                    var uri = new Uri(new Uri(ApiUrl), query);

                    var response = await httpClient.GetAsync(uri);
                    if (!response.IsSuccessStatusCode)
                    {
                        return null;
                    }

                    // lets read the token
                    string access_token = await response.Content.ReadAsStringAsync();

                    // parse the token to find settings for the user interface
                    string claimstring = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(access_token.Split('.')[1]));
                    var claims = JObject.Parse(claimstring);
                    TokenTask taskFlags = (TokenTask)claims["task"].Value<int>();

                    int recordings = (taskFlags & TokenTask.LiveDetection) == TokenTask.LiveDetection ? (taskFlags & TokenTask.Enroll) == TokenTask.Enroll ? 4 : 2 : 1;
                    string challengesJson = "[]";
                    if ((taskFlags & TokenTask.ChallengeResponse) == TokenTask.ChallengeResponse)
                    {
                        recordings = 4;
                        string challenges = (string)claims["challenge"];
                        if (!string.IsNullOrEmpty(challenges))
                        {
                            challengesJson = challenges;
                            string[][] challengeSequences = JsonConvert.DeserializeObject<string[][]>(challenges);
                            if (challengeSequences.Length > 0 && challengeSequences[0].Length > 0)
                            {
                                recordings = challengeSequences[0].Length + 1;
                            }
                        }
                    }

                    return access_token;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [Flags]
        public enum TokenTask
        {
            Verify = 0,
            Identify = 0x10,
            Enroll = 0x20,
            LiveOnly = 0x80,
            MaxTriesMask = 0x0F,
            LiveDetection = 0x100,
            ChallengeResponse = 0x200,
            AutoEnroll = 0x1000
        }

        [HttpPost("[action]")]
        public async Task<Result> PhotoVerify([FromBody] PhotoVerifyImages images)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                    Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_appID}:{_appSecret}")));


                string json = $@"{{""liveimage1"":""{images.liveimage1}"",""liveimage2"":""{images.liveimage2}"",""idphoto"":""{images.idphoto}""}}";

                using (var content = new StringContent(json, Encoding.ASCII, "application/json"))
                using (var response = await client.PostAsync($"https://bws.bioid.com/extension/photoverify?accuracy={images.accuracy ?? 4}", content))
                {
                    if (response.StatusCode == HttpStatusCode.OK)
                    {
                        if (bool.TryParse(await response.Content.ReadAsStringAsync(), out var parsed))
                        {
                            return new Result() { IsValid = parsed };
                        }
                    }
                    return new Result() { IsValid = false };
                }
            }
        }
    }
}