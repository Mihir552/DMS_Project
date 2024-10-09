using System;
using System.Collections.Generic;

namespace DemandMgmt.Business.DataBase;

public partial class LoginMaster
{
    public string? UserId { get; set; }

    public string? Password { get; set; }

    public DateTime? TimeStamp { get; set; }

    public string? DmsroleAccess { get; set; }

    public string? EmailId { get; set; }

    public int Id { get; set; }

    public string DeptName { get; set; } = null!;

    public string? Name { get; set; }

    public string? Practice { get; set; }
}
