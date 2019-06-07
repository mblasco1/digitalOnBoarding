using DigitalOnboarding.Models;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace DigitalOnboarding.Services
{
    public class BioIdClient : IBioIdClient
    {
        private readonly HttpClient httpClient;
        private const string appID = "9835d0c6-8985-4657-b6c8-b13f52752d18";
        private const string appSecret = "wgiVhwfNMoX6ZYlj1+lJNb5D";
        private const string apiUrl = "https://bws.bioid.com/extension/";

        public BioIdClient()
        {
            httpClient = new HttpClient();
            string credentials = Convert.ToBase64String(Encoding.GetEncoding("iso-8859-1").GetBytes($"{appID}:{appSecret}"));
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);
        }
        public async Task<BioIdToken> getTokenAsync()
        {
            string query = $"token?id={appID}&bcid=xxx&task=livenessdetection&livedetection=true&challenge=false&autoenroll=false";

            var uri = new Uri(new Uri(apiUrl), query);

            var response = await httpClient.GetAsync(uri);
            if (!response.IsSuccessStatusCode)
            {
                return null;
            }

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

            return new BioIdToken()
            {
                Task = (taskFlags & TokenTask.Enroll) == TokenTask.Enroll ? "enrollment" :
                    (taskFlags & TokenTask.Identify) == TokenTask.Identify ? "identification" :
                    (taskFlags & TokenTask.LiveOnly) == TokenTask.LiveOnly ? "livenessdetection" :
                    "verification",
                MaxTries = (int)(taskFlags & TokenTask.MaxTriesMask),
                Recordings = recordings,
                ChallengeResponse = (taskFlags & TokenTask.ChallengeResponse) == TokenTask.ChallengeResponse,
                ChallengesJson = challengesJson,
                Token = access_token,
                ApiUrl = apiUrl,
                State = "encrypted_app_status",
                Trait = "Face,Periocular",
                AutoEnroll = (taskFlags & TokenTask.AutoEnroll) == TokenTask.AutoEnroll,
                AutoStart = false
            };
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

        public async Task<(Result, int, string)> PhotoVerifyAsync(PhotoVerifyImages images)
        {
            string json = $@"{{""liveimage1"":""{images.liveimage1}"",""liveimage2"":""{images.liveimage2}"",""idphoto"":""{images.idphoto}""}}";

            using (var content = new StringContent(json, Encoding.ASCII, "application/json"))
            using (var response = await httpClient.PostAsync(apiUrl + $"photoverify?accuracy={images.accuracy ?? 4}", content))
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    if (bool.TryParse(responseContent, out var parsed))
                    {
                        return (new Result() { IsValid = parsed }, 200, responseContent);
                    }
                }
                return (null, (int)response.StatusCode, responseContent);
            }
        }
    }
}
