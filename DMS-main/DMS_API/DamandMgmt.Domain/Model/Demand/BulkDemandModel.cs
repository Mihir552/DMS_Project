using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemandMgmt.Domain.Model.Demand
{
    public class BulkDemandModel
    {
        public BulkDemandModel()
        {
            Demand = new DemandModel();
        }
        public DemandModel Demand { get; set; }
        public bool IsInsertNew { get; set; }
        public bool? isError { get; set; }
        public string Message { get; set; }
    }

    public class BulkDemandResponse
    {
        public BulkDemandResponse()
        {
            Demands = new List<BulkDemandModel>();
        }
        public List<BulkDemandModel>? Demands { get; set; }
        public bool IsUploadError { get; set; }
        public string Message { get; set; }
    }
}
