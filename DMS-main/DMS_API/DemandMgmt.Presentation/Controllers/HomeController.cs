using DemandMgmt.Presentation.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DemandMgmt.Presentation.Controllers { 
    [AllowAnonymous]
    [ApiExplorerSettings(IgnoreApi = true)]
    
    public class HomeController : Controller
    {
        [Route("[controller]")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult Index()
        {
            return View();
        }
    }
}
