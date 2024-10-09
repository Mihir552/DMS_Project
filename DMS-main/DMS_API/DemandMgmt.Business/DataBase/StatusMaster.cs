using System;
using System.Collections.Generic;

namespace DemandMgmt.Business.DataBase;

public partial class StatusMaster
{
    public int Id { get; set; }

    public string Status { get; set; } = null!;

    public string RoleMapping { get; set; } = null!;
}
