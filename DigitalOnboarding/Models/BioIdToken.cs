using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalOnboarding.Models
{
    public class BioIdToken
    {
        public string Task { get; set; }
        public string ApiUrl { get; set; }
        public string Token { get; set; }
        public string State { get; set; }
        public string Trait { get; set; }
        public int Recordings { get; set; }
        public int MaxTries { get; set; }
        public bool ChallengeResponse { get; set; }
        public string ChallengesJson { get; set; }
        public bool AutoEnroll { get; set; }
        public bool AutoStart { get; set; }
    }
}
