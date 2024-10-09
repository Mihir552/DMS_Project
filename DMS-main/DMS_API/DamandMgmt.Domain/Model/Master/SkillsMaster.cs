using System;
using System.Collections.Generic;

namespace DemandMgmt.Domain.Model.Master;

public partial class SkillsMaster
{
    public int Id { get; set; }

    public string? SkillId { get; set; }

    public string? SkillName { get; set; }

    public string? SkillType { get; set; }
}
