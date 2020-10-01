using Etain.Models.Account.Login;
using Etain.Models.Account.Register;
using Etain.Models.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System.Threading.Tasks;
using System.Web.Http;

namespace Etain.Controllers.API
{
    public class AccountController : BaseApiController
    {
        public AccountController() { }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
            :base(userManager, signInManager) { }

        public IHttpActionResult Get() =>
            Ok(User.Identity.IsAuthenticated);

        public async Task<IHttpActionResult> Post(LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await SignInManager.PasswordSignInAsync(request.Email, request.Password, true, shouldLockout: false);
            switch (result)
            {
                case SignInStatus.Success:
                    return Ok();
                case SignInStatus.Failure:
                default:
                    // TODO :   Issue trying to get 'AutomaticChallenge' working in Startup.Auth and this should really be an unauthorised
                    return BadRequest();
            }
        }

        public async Task<IHttpActionResult> Put(RegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = new ApplicationUser { UserName = request.Email, Email = request.Email };
            var result = await UserManager.CreateAsync(user, request.Password);

            if (result.Succeeded)
            {
                await SignInManager.SignInAsync(user, isPersistent: true, rememberBrowser: false);

                return Ok();
            }

            // TODO :   Issue trying to get 'AutomaticChallenge' working in Startup.Auth and this should really be an unauthorised
            return BadRequest();
        }

        public IHttpActionResult Delete()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);

            return Ok();
        }
    }
}
