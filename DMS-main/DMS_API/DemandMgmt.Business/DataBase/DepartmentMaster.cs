using System;
using System.Collections.Generic;

namespace DemandMgmt.Business.DataBase;

public partial class DepartmentMaster
{
    public int Id { get; set; }

    public int DepartmentId { get; set; }

    public string? DepartmentName { get; set; }

    public string? InitiatorName { get; set; }

    public string? GlobalAccountManagerDe { get; set; }

    public string? GlobalAccountManagerIn { get; set; }
}
