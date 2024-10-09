using System;
using System.Collections.Generic;

namespace DemandMgmt.Domain.Model.Master;

public partial class ContractorMaster
{
    public int Id { get; set; }

    public int ContractorId { get; set; }

    public string ContractorName { get; set; } = null!;
}
