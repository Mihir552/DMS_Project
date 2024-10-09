using DemandMgmt.Business.DataBase;
using DemandMgmt.Domain.Model.Employee;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DemandMgmt.Business.Validation
{
    public class EmployeeValidation : IEmployeeValidation
    {
        private EdmsContext edmsContext;
        private List<string> errors;
        public EmployeeValidation(EdmsContext _edmsContext)
        {
            edmsContext = _edmsContext;
            errors = new List<string>();
        }

        public List<string> ValidateEmployeeAllocationForApprovalProcess(int EMPID, int allocationStatus, string? UID)
        {
            if (UID != null)
            {
                CheckIfUIDIsValid(UID);
            }
            CheckIfAllocationStatusIsValid(allocationStatus);
            CheckIfEmployeeCanBeAllocated(EMPID, allocationStatus);
            return errors;

        }

        private void CheckIfUIDIsValid(string UID)
        {
            if (!edmsContext.Demands.Where(x => x.Uid == UID).Any())
                errors.Add("UID Does not exist");
        }

        private void CheckIfAllocationStatusIsValid(int allocationStatus)
        {
            if (!edmsContext.AllocationStatuses.Any(x => x.Id == allocationStatus))
            {
                errors.Add("Invalid Allocation Status");
            }
        }

        private void CheckIfEmployeeCanBeAllocated(int EMPID, int allocationStatus)
        {
            if (edmsContext.AllocationMappings.First(x => x.Empid == EMPID).AllocationStatus >= Domain.Model.Employee.AllocationStatus.Allocated)
            {
                errors.Add("Employee already allocated or unavailable");
            }
        }
    }
}
