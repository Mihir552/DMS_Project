using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemandMgmt.Domain.Model.Employee
{
    public class EmployeeModel
    {
        public int EmpID { get; set; }
        public string Emp_Name { get; set; }
        public DateOnly DOJ { get; set; }
        public int? PracticeId { get; set; }
        public int Band { get; set; }
        public int? ManagerId { get; set; }
        public int? Desingnation { get; set; }
        public int? SkillID { get; set; }
        public decimal YearsOfExperience { get; set; }
        public int? AllocationStatus { get; set; }
        public DateOnly? AllocationDate { get; set; }
        public string? UID { get; set; }
    }

    public class EmployeeAllocationApiPayload
    {
        public int EmpId { get; set; }
        public string Uid { get; set; }
        public bool assignEmployee { get; set; }
    }
}
