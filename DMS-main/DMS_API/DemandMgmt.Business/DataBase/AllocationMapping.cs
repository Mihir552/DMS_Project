using System;
using System.Collections.Generic;

namespace DemandMgmt.Business.DataBase;

public partial class AllocationMapping
{
    public int Empid { get; set; }

    public int AllocationStatus { get; set; }

    public DateOnly? AllocationDate { get; set; }

    public string? Uid { get; set; }

    public virtual AllocationStatus AllocationStatusNavigation { get; set; } = null!;

    public virtual Employee Emp { get; set; } = null!;
}
