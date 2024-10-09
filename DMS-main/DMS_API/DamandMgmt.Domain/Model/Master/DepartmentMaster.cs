using System;
using System.Collections.Generic;

namespace DemandMgmt.Domain.Model.Master;

public partial class DepartmentMaster
{
    public int Id { get; set; }

    public int DepartmentId { get; set; }

    public string? DepartmentName { get; set; }

    public string? Initiator_Name { get; set; }
    public string? Global_Account_Manager_DE { get; set; }
    public string? Global_Account_Manager_IN { get; set; }
}
