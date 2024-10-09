using DemandMgmt.Business.DataBase;
using DemandMgmt.Domain.Model.Demand;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemandMgmt.Business.Validation
{
    public class DemandValidation : IDemandValidation
    {
        private EdmsContext edmsContext;
        public DemandValidation(EdmsContext _edmsContext)
        {
            edmsContext = _edmsContext;
        }
        public List<string> AddDemandValidation(DemandModel demand)
        {
            var errorList = new List<string>();
            if (IsUIDExist(demand.Uid))
            {
                errorList.Add("The " + demand.Uid + " UID already exist");
            }
            if (IsValidOtherContractor(demand.ContractorReplacement, demand.OtherContractor))
            {
                errorList.Add("Please enter other Contractor");
            }
            return errorList;
        }
        public bool IsUIDExist(string uid)
        {

            int demandsCount = edmsContext.Demands.Where(x => x.IsActive == 1 && x.Uid == uid).ToList().Count;
            if (demandsCount == 0)
                return false;
            else
                return true;
        }
        private bool IsValidOtherContractor(int ContractorReplacement, string other)
        {
            if (ContractorReplacement == 0 && string.IsNullOrEmpty(other.Trim()))
                return true;
            return false;
        }
    }
}
