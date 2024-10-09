using DemandMgmt.Business.DataBase;
using DemandMgmt.Business.Validation;
using DemandMgmt.Domain.Model.Employee;
using DemandMgmt.Domain.Services;
using DocumentFormat.OpenXml.Spreadsheet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemandMgmt.Business.Services
{
    public class EmployeeService : IEmployeeService
    {
        private EdmsContext edmsContext;
        IEmployeeValidation employeeValidation;
        public EmployeeService(EdmsContext _edmsContext, IEmployeeValidation _employeeValidation)
        {
            edmsContext = _edmsContext;
            employeeValidation = _employeeValidation;
        }

        private IQueryable<EmployeeModel>? getAllEmployees()
        {
            IQueryable<EmployeeModel>? employees;
            var employeesDb = edmsContext.Employees;
            var allocationMappingDB = edmsContext.AllocationMappings;

            try
            {
                employees =
                        (from employee in employeesDb
                         join allocation in allocationMappingDB
                         on employee.EmpId equals allocation.Empid
                         select new EmployeeModel()
                         {
                             EmpID = employee.EmpId,
                             Band = employee.Band,
                             DOJ = employee.Doj,
                             Emp_Name = employee.EmpName,
                             ManagerId = employee.ManagerId,
                             PracticeId = employee.PracticeId,
                             Desingnation = employee.Designation,
                             SkillID = employee.SkillId,
                             YearsOfExperience = employee.YearsOfExperience,
                             AllocationDate = allocation.AllocationDate,
                             AllocationStatus = allocation.AllocationStatus,
                             UID = allocation.Uid,
                         });
            }
            catch (Exception ex)
            {
                employees = null;
            }
            return employees;
        }

        public List<EmployeeModel> GetAllEmployees()
        {
            var employees = getAllEmployees();
            if(employees == null)
            {
                return null;
            }
            else
            {
                return employees.ToList();
            }
        }

        public List<EmployeeModel> GetAllEmployeesAssignedToUID(List<string> uids)
        {
            var employees = getAllEmployees();
            if (employees == null)
            {
                return null;
            }
            else
            {
                return employees.Where(employee => employee.UID != null && uids.Contains(employee.UID)).ToList();
            }
        }

        public (List<string>, bool) UpdateEmployeeAssignmentForApprovalProcess(int EMPID, int allocationStatus, string UID)
        {
            bool isSuccess = false;
            var errors = employeeValidation.ValidateEmployeeAllocationForApprovalProcess(EMPID, allocationStatus, UID);

            try
            {
                if (errors.Count <= 0)
                {
                    var mapping = edmsContext.AllocationMappings.Where(x => x.Empid == EMPID).First();
                    mapping.AllocationDate = DateOnly.FromDateTime(DateTime.Now);
                    mapping.AllocationStatus = allocationStatus;
                    mapping.Uid = allocationStatus == Domain.Model.Employee.AllocationStatus.Assigned ? UID : null;

                    edmsContext.AllocationMappings.Update(mapping);
                    edmsContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                isSuccess = false;
            }

            return (errors, isSuccess);
        }
    }
}
