using System.ComponentModel.DataAnnotations;

namespace Etain.Models.Account.Register
{
    public class RegisterRequest
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}