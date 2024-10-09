using System;
using System.Collections.Generic;

namespace DemandMgmt.Business.DataBase;

public partial class EmpDesignationMaster
{
    public int Id { get; set; }

    public string? Designation { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
