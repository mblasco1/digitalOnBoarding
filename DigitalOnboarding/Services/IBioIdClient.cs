using System.Net.Http;
using System.Threading.Tasks;
using DigitalOnboarding.Models;

namespace DigitalOnboarding.Services
{
    public interface IBioIdClient
    {
        Task<BioIdToken> getTokenAsync();
        Task<(Result, int, string)> PhotoVerifyAsync(PhotoVerifyImages images);
    }
}