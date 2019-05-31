using DigitalOnboarding.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalOnboarding.Services
{
    public interface IAddressChecker
    {
        Task<Result> VerifyAsync(Address address);
    }
}
