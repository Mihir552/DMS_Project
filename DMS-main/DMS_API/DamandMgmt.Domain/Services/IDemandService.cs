using DemandMgmt.Domain.Model.Demand;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DemandMgmt.Domain.Services
{
    public interface IDemandService
    {
        List<string> AddData(DemandModel demand);
        List<string> AddBulkData(List<DemandModel> demand);
        bool UpdateData(DemandModel demand);
        bool DeleteData(int id);
        List<DemandModel> GetAllDemand(int[] PracticeID);
        List<DemandAction> GetPendingDemands(int[] LoginID, List<string> Roles);
        List<string> ActionDemands(List<DemandAction> demandActions);
        BulkDemandResponse BulkUpload(MemoryStream ms);
    }
}
