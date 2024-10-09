using Azure;
using DemandMgmt.Domain.Model;
using DemandMgmt.Domain.Model.Demand;
using DemandMgmt.Domain.Model.User;
using DemandMgmt.Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Response = DemandMgmt.Domain.Model.Response;


namespace DemandMgmt.Presentation.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DemandController : ControllerBase
    {
        IDemandService _demandService;

        public DemandController(IDemandService demandService)
        {
            _demandService = demandService;
        }

        //[AllowAnonymous]
        [HttpGet]
        public List<DemandModel> GetAllDemand()
        {
            var user = HttpContext.Items["User"] as UserInfo;
            List<DemandModel> allDemands = _demandService.GetAllDemand(user.PracticeID);
            return allDemands;
        }
        //[AllowAnonymous]
        [HttpPost]
        public Response AddNewDemand([FromBody] DemandModel demand)
        {
            var user = HttpContext.Items["User"] as UserInfo;
            Response response = new Response();
            List<string> success = _demandService.AddData(demand);
            response.Status = success.Count > 0 ? false : true;
            response.ErrorList = success;

            if (response.Status) {
                //List<DemandAction> demandActions
                _demandService.ActionDemands(new List<DemandAction>() {
                    new DemandAction{
                        Uid=demand.Uid,
                        Action = true,
                        currentStatus= demand.Status,
                        Remark = demand.AdditionalRemark
                    }
                });
            }
            return response;
        }
        [AllowAnonymous]
        [HttpPost]
        public Response DeleteData([FromBody] int id)
        {
            Response response = new Response();
            response.Status = _demandService.DeleteData(id);
            response.ErrorList = new   List<string>();
            //bool success = _demandService.DeleteData(id);
            return response;
        }
        //[AllowAnonymous]
        [HttpPost]
        public Response UpdateData([FromBody] DemandModel demand)
        {
            Response response = new Response();
            response.Status = _demandService.UpdateData(demand);
            response.ErrorList = new List<string>();
            return response;
        }
        //[AllowAnonymous]
        [HttpGet]
        public List<DemandAction> GetPendingDemands()
        {
            var user = HttpContext.Items["User"] as UserInfo;
            int[] PracticeID = new int[] {2,3};
            List<string> Roles = new List<string>
            { "Supply Approver (PH)"};
            List<DemandAction> allDemands = _demandService.GetPendingDemands(user.PracticeID, user.Roles);
            return allDemands;
        }
        [AllowAnonymous]
        [HttpPost]
        public Response ActionDemands(List<DemandAction> demandActions)
        {
            Response response = new Response();
            List<string> demandResponse = _demandService.ActionDemands(demandActions);
            response.Status =true;
            response.ErrorList = demandResponse;
            return response;
        }
        [AllowAnonymous]
        [HttpPost]
        public BulkDemandResponse BulkUpload(IFormFile file)
        {
            var fileType = file.ContentType;
            if (!string.Equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileType))
            {

                return new BulkDemandResponse()
                {
                    Demands = [],
                    IsUploadError = true,
                    Message = "Please upload .xlsx file"
                };
            }
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                return _demandService.BulkUpload(ms);

            }
        }
        [AllowAnonymous]
        [HttpPost]
        public Response BulkUploadDemand([FromBody] List<DemandModel> demand)
        {
            Response response = new Response();
            List<string> success = _demandService.AddBulkData(demand);
            response.Status = success.Count > 0 ? false : true;
            response.ErrorList = success;
            return response;
        }
    }
}
