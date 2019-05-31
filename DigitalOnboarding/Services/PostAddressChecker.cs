using DigitalOnboarding.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Threading.Tasks;


namespace DigitalOnboarding.Services
{
    public class PostAddressChecker : IAddressChecker
    {
        public async Task<Result> VerifyAsync(Address address)
        {

            var basicHttpBinding = new BasicHttpBinding(BasicHttpSecurityMode.Transport);
            basicHttpBinding.Security.Transport.ClientCredentialType = HttpClientCredentialType.Basic;

            var endpointAddress = new EndpointAddress(new Uri("https://webservices.post.ch/IN_ADRCHECKERxV4xEXTERNE/V4-02-00"));

            var factory = new ChannelFactory<AddressChecker.ACHePortType>(basicHttpBinding, endpointAddress);
            factory.Credentials.UserName.UserName = "TU_4400172_0001";
            factory.Credentials.UserName.Password = "XzX6pQFt";

            var serviceProxy = factory.CreateChannel();
            try
            {
                var request = new AddressChecker.Input(new AddressChecker.AdressCheckerRequestType()
                {
                    Names = address.Name,
                    Street = address.Street,
                    Town = address.City,
                    HouseNbr = address.HouseNumber,
                    Zip = address.PostalCode,
                    Params = new AddressChecker.AdressCheckerRequestTypeParams()
                    {
                        CallUser = "TU_4400172_0001",
                        MaxRows = "10",
                        SearchLanguage = "1",
                        SearchType = "1"
                    }
                });

                var response = (await serviceProxy.AdrCheckerExterneAsync(request)).AdressCheckerResponse;
                if (response.HasMoreRows || response.Rows.Count() != 1)
                {
                    // TODO
                }
                var responseRow = response.Rows[0];
                return new Result()
                {
                    IsValid = responseRow.MatchUniqueness == "1" && responseRow.MatchType == "1"
                };
            }
            finally
            {
                factory.Close();
            }
        }
    }
}
