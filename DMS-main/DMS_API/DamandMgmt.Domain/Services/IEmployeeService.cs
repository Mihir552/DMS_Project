using DemandMgmt.Domain.Model.Employee;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemandMgmt.Domain.Services
{
    public interface IEmployeeService
    {
        List<EmployeeModel> GetAllEmployees();

        List<EmployeeModel> GetAllEmployeesAssignedToUID(List<string> uids);

        (List<string>, bool) UpdateEmployeeAssignmentForApprovalProcess(int EMPID, int allocationStatus, string UID);

    }
}
