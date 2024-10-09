using System;
using System.Collections.Generic;

namespace DemandMgmt.Business.DataBase;

public partial class AllocationStatus
{
    public int Id { get; set; }

    public string AllocationStatus1 { get; set; } = null!;

    public virtual ICollection<AllocationMapping> AllocationMappings { get; set; } = new List<AllocationMapping>();
}
