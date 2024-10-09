using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemandMgmt.Domain.Model.Employee
{
    public class Constants
    {

    }

    public class AllocationStatus
    {

        public const int KTOngoing = 7;
        public const int Allocated = 3;
        public const int Assigned = 2;
        public const int Available = 1;
        public const int KTCompleted = 8;
        public const int Recharged = 4;
        public const int Resigned = 5;
        public const int WaitingForKT = 6;
        public const int WaitingForRecharge = 9;
    }
}
