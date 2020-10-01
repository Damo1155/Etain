using BusinessLayer.Common.Interfaces;
using BusinessLayer.Models.Weather;
using BusinessLayer.Weather.Interfaces;
using System.Threading.Tasks;

namespace BusinessLayer.Weather
{
    public class WeatherService : IWeatherService
    {
        private readonly IApiService _apiService;

        private const string WeatherApiUrl = "https://www.metaweather.com/api/location";

        public WeatherService(IApiService apiService)
        {
            _apiService = apiService;
        }

        public async Task<WeatherDetailsResponse> RetrieveTestDetails(WeatherDetailsRequest request) =>
            await _apiService.GetAsync<WeatherDetailsResponse>(WeatherApiUrl, request);
    }
}
