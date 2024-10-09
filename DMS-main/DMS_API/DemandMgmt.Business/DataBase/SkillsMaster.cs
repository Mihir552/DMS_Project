using System;
using System.Collections.Generic;

namespace DemandMgmt.Business.DataBase;

public partial class SkillsMaster
{
    public int Id { get; set; }

    public string? SkillId { get; set; }

    public string? SkillName { get; set; }

    public string? SkillType { get; set; }

    public int? Practice { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
