using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace DemandMgmt.Domain.Model.Demand
{
    public class DemandModel
    {
        public int Id { get; set; }

        public string Uid { get; set; }
        public int Practice { get; set; }

        public string Asset { get; set; }

        public int Role { get; set; }

        public string RoleDetails { get; set; }
        public float YearsOfExp { get; set; }

        public int Department { get; set; }

        public string RaisedBy { get; set; }

        public int PrimarySkills { get; set; }

        public List<int> SecondarySkills { get; set; }

        public string SkillDetails { get; set; }

        public DateTime? RequiredByDate { get; set; }

        public DateTime? RaisedOn { get; set; }

        public DateTime? KTstartDate { get; set; }

        public DateTime? KTendDate { get; set; }

        public bool HLCApproval { get; set; }

        public DateTime? HLCApprovalDate { get; set; }

        public string JDFileLocation { get; set; }

        public string DemandInitiationFileLocation { get; set; }

        public int ContractorReplacement { get; set; }

        public string OtherContractor { get; set; }

        public DateTime? RechargeDate { get; set; }

        public int MTBShare { get; set; }

        public int TTBShare { get; set; }

        public int Status { get; set; } 

        public string AdditionalRemark { get; set; }

        public bool IsActive { get; set; }
    }
}
