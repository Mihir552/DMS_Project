using System;
using System.Collections.Generic;

namespace DemandMgmt.Domain.Model.Master;

public partial class StatusModel
{
    public int Id { get; set; }

    public string? Status { get; set; }

    public string? RoleMapping { get; set; }
}
