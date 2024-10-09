using System;
using System.Collections.Generic;

namespace DemandMgmt.Business.DataBase;

public partial class EmpBandMaster
{
    public int Id { get; set; }

    public string? Band { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
