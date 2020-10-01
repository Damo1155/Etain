using BusinessLayer.Common.Interfaces;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;

namespace BusinessLayer.Common
{
    public class ApiService : IApiService
    {
        private readonly HttpClient _httpClient;

        public ApiService()
        {
            _httpClient = new HttpClient();
        }

        public async Task<T> GetAsync<T>(string endpoint, object requestObject)
        {
            _httpClient.BaseAddress = new Uri("https://www.metaweather.com/api/location/");

            var serialiseObject = Serialise(requestObject);
            var response = await _httpClient.GetAsync(serialiseObject);

            var results = await System.Text.Json.JsonSerializer.DeserializeAsync<T>(await response.Content.ReadAsStreamAsync());

            _httpClient.Dispose();

            return results;
        }

        private string Serialise(object obj)
        {
            var properties = from p in obj.GetType().GetProperties()
                             where p.GetValue(obj, null) != null
                             select HttpUtility.UrlEncode(p.GetValue(obj, null).ToString()) + "/";

            return string.Join("/", properties.ToArray());
        }
    }
}
