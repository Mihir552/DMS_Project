using System;
using System.Collections.Generic;

namespace DemandMgmt.Business.DataBase;

public partial class StatusHistory
{
    public int Id { get; set; }

    public string Uid { get; set; } = null!;

    public int StatusId { get; set; }

    public string Remark { get; set; } = null!;

    public DateTime TimeStamp { get; set; }
}
