using BusinessLayer.Models.Weather;
using System.Threading.Tasks;

namespace BusinessLayer.Weather.Interfaces
{
    public interface IWeatherService
    {
        Task<WeatherDetailsResponse> RetrieveTestDetails(WeatherDetailsRequest request);
    }
}
