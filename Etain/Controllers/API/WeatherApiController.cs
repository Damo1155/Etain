using BusinessLayer.Models.Weather;
using BusinessLayer.Weather.Interfaces;
using System.Threading.Tasks;
using System.Web.Http;

namespace Etain.Controllers.API
{
    public class WeatherApiController : ApiController
    {        
        private readonly IWeatherService _testDetailsService;

        public WeatherApiController(IWeatherService testDetailsService)
        {
            _testDetailsService = testDetailsService;
        }

        public async Task<IHttpActionResult> Get([FromUri] WeatherDetailsRequest request)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized();
            }

            return Ok(await _testDetailsService.RetrieveTestDetails(request));
        }
    }
}
