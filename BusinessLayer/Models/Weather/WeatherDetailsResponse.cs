using System.Collections.Generic;

namespace BusinessLayer.Models.Weather
{
    public class WeatherDetailsResponse
    {
        public string title { get; set; }

        public IEnumerable<WeatherBreakdownResponse> consolidated_weather { get; set; }
    }
}
