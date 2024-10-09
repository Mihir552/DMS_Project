using DemandMgmt.Domain.Model;
using DemandMgmt.Domain.Model.Employee;
using DemandMgmt.Domain.Services;
using DemandMgmt.Presentation.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DemandMgmt.Presentation.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService) { 
            _employeeService = employeeService;
        }

        [HttpGet]
        public List<EmployeeModel> GetAllEmployees()
        {
            return _employeeService.GetAllEmployees();
        }

        [HttpPost]
        [JWTAuthorize(Role:"Supply Manager")]
        public Response UpdateEmployeeAssignmentForApprovalProcess([FromBody] EmployeeAllocationApiPayload employeeAssignPayload)
        {
            var result  = _employeeService.UpdateEmployeeAssignmentForApprovalProcess(employeeAssignPayload.EmpId, employeeAssignPayload.assignEmployee ? AllocationStatus.Assigned : AllocationStatus.Available , employeeAssignPayload.Uid);
            Response response = new Response();
            if(result.Item1.Count > 0)
            {
                response.Status = false;
                response.ErrorList = result.Item1;
            }
            else
            {
                response.Status = true;
            }

            return response;
        }
    }
}
