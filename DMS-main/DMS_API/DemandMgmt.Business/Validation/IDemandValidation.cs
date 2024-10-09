using DemandMgmt.Domain.Model.Demand;

namespace DemandMgmt.Business.Validation
{
    public interface IDemandValidation
    {
        List<string> AddDemandValidation(DemandModel demand);
        bool IsUIDExist(string uid);
    }
}