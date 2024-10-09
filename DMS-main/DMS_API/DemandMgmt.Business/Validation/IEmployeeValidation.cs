
namespace DemandMgmt.Business.Validation
{
    public interface IEmployeeValidation
    {
        List<string> ValidateEmployeeAllocationForApprovalProcess(int EMPID, int allocationStatus, string? UID);
    }
}