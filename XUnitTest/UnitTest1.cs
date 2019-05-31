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
            var address = new Address()
            {
                Name = "Fabio Strappazzon",
                Street = "Webermühle",
                HouseNumber = "42",
                PostalCode = "5432",
                City = "Neuenhof"
            };

            var checker = new PostAddressChecker();
            var result = await checker.VerifyAsync(address);

            Assert.True(result.IsValid);
        }
        [Fact]
        public async void TestSimilarAddress()
        {
            var address = new Address()
            {
                Name = "Fabio Strappazon", //should be double-z
                Street = "Webermühle",
                HouseNumber = "42",
                PostalCode = "5432",
                City = "Neuenhof"
            };

            var checker = new PostAddressChecker();
            var result = await checker.VerifyAsync(address);

            Assert.False(result.IsValid);
        }
    }
}
