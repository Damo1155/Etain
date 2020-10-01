using System.ComponentModel.DataAnnotations;

namespace Etain.Models.Account.Login
{
    public class LoginRequest
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}