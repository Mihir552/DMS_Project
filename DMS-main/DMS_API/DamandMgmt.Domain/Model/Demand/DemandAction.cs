using DemandMgmt.Domain.Model.Employee;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace DemandMgmt.Domain.Model.Demand
{
    public class DemandAction
    {
        public string Uid { get; set; }
        public int currentStatus { get; set; }
        public int nextStatus { get; set; }
        public string Remark { get; set; }
        public bool Action { get; set; }
        public EmployeeModel? Employee { get; set; } = null;
    }
}
