using System;
using System.Collections.Generic;

namespace DemandMgmt.Business.DataBase;

public partial class PracticeMaster
{
    public int Id { get; set; }

    public string? PracticeName { get; set; }

    public virtual ICollection<Demand> Demands { get; set; } = new List<Demand>();

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
