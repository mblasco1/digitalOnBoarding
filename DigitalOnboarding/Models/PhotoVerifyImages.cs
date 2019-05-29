using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalOnboarding.Models
{
    public class PhotoVerifyImages
    {
        [Range(1, 5)]
        public int? accuracy { get; set; }
        [Required]
        public string idphoto { get; set; }
        [Required]
        public string liveimage1 { get; set; }
        [Required]
        public string liveimage2 { get; set; }
    }
}
