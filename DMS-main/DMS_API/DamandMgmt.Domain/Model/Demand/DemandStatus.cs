using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemandMgmt.Domain.Model.Demand
{
    public enum DemandStatus
    {
        Initiated,
        DemandManagerAprovalPending,
        DemandManagerAprovalRejected,
        DemandApprover_PH_ApprovalPending,
        DemandApprover_PH_ApprovalRejected,
        DemandApprover_DSH_ApprovalPending,
        DemandApprover_DSH_ApprovalRejected,
        SupplyManagerApprovalPending,
        SupplyManagerApprovalRejected,
        SupplyApproverApprovalPending,
        SupplyApproverApprovalRejected,
        SupplyRecruiterApprovalPending,
        SupplyRecruiterApprovalRejected,
        Fulfilled,
    }
}
