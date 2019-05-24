using DigitalOnboarding.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalOnboarding.Services
{
    public interface IAddressChecker
    {
        Task<Result> Verify(Address address);
    }

    

    public struct Result
    {
        public MatchUniqueness MatchUniqueness { get; set; }
        public MatchType MatchType { get; set; }
        public MatchHistoric MatchHistoric { get; set;}
        public GuaranteedDelivery GuaranteedDelivery { get; set; }

    }

    public enum MatchUniqueness
    {
        noMatch, oneMatch, multipleMatches
    }

    public enum MatchType
    {
        noMatch, exactMach, similarMatch, abbreviatedMatch
    }

    public enum MatchHistoric
    {
        noMatch, historicMatch, currentMatch
    }
    public enum GuaranteedDelivery
    {
        deliverable, indetermined, notDeliverable
    }
}
