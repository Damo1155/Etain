using System.Threading.Tasks;

namespace BusinessLayer.Common.Interfaces
{
    public interface IApiService
    {
        Task<T> GetAsync<T>(string endpoint, object requestObject);
    }
}
