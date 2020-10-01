using System;

namespace BusinessLayer.Models.Weather
{
    public class WeatherBreakdownResponse
    {
        public string weather_state_name { get; set; }
        public string weather_state_abbr { get; set; }

        public DateTime applicable_date { get; set; }
    }
}
