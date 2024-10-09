using DemandMgmt.Domain.Model.User;
using DemandMgmt.Presentation.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata;
using DemandMgmt.Business.Services;
using DemandMgmt.Domain.Model.Master;
using DemandMgmt.Business.DataBase;
using DemandMgmt.Domain.Model.Demand;
using DemandMgmt.Domain.Services;

namespace DemandMgmt.Presentation.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MasterController : ControllerBase
    {
        IMasterService _masterService;

        public MasterController(IMasterService masterService)
        {
            _masterService = masterService;
        }

        [AllowAnonymous]
        [HttpGet]
        public Master GetAllMaster()
        {
            Master masterDetails = _masterService.GetMaster();
            //List<Master> masterDetails = new List<Master>();
            return masterDetails; 
        }
    }
}
