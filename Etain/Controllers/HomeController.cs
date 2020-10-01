using System.Web.Mvc;

namespace Etain.Controllers
{
    public partial class HomeController : Controller
    {
        public virtual ActionResult Index() =>
            View();
    }
}