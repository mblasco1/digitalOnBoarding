using DigitalOnboarding.Models;
using DigitalOnboarding.Services;
using System;
using Xunit;


namespace XUnitTest
{
    public class UnitTest1
    {
        [Fact]
        public async void TestPostAddressChecker()
        {
            var address = new Address() {
                Name = "Fabio Strappazzon",
                Street = "Webermühle",
                HouseNbr = "42",
                Zip = "5432",
                Town = "Neuenhof"
            };

            var checker = new PostAddressChecker();
            var result = await checker.Verify(address);

            //Assert.Equal(GuaranteedDelivery.deliverable, result.GuaranteedDelivery);
            Assert.Equal(MatchHistoric.currentMatch, result.MatchHistoric);
            Assert.Equal(MatchType.exactMach, result.MatchType);
            Assert.Equal(MatchUniqueness.oneMatch, result.MatchUniqueness);
        }
        [Fact]
        public async void TestSimilarAddress()
        {
            var address = new Address()
            {
                Name = "Fabio Strappazon", //should be double-z
                Street = "Webermühle",
                HouseNbr = "42",
                Zip = "5432",
                Town = "Neuenhof"
            };

            var checker = new PostAddressChecker();
            var result = await checker.Verify(address);

            //Assert.Equal(GuaranteedDelivery.deliverable, result.GuaranteedDelivery);
            Assert.Equal(MatchHistoric.currentMatch, result.MatchHistoric);
            Assert.Equal(MatchType.similarMatch, result.MatchType);
            Assert.Equal(MatchUniqueness.oneMatch, result.MatchUniqueness);
        }
    }
}
