using System;
using System.Collections.Generic;

namespace DemandMgmt.Business.DataBase;

public partial class Demand
{
    public int Id { get; set; }

    public string? Uid { get; set; }

    public string? Asset { get; set; }

    public int? Role { get; set; }

    public string? RoleDetails { get; set; }

    public string? YearsOfExp { get; set; }

    public int Department { get; set; }

    public string? RaisedBy { get; set; }

    public int PrimarySkills { get; set; }

    public string? SecondarySkills { get; set; }

    public string? SkillDetails { get; set; }

    public string? RequiredByDate { get; set; }

    public string? RaisedOn { get; set; }

    public string? KtstartDate { get; set; }

    public string? KtendDate { get; set; }

    public int? HlcApproval { get; set; }

    public string? HlcApprovalDate { get; set; }

    public string? JdFileLocation { get; set; }

    public string? DemandInitiationFileLocation { get; set; }

    public string? ContractorReplacement { get; set; }

    public string? OtherContractor { get; set; }

    public string? RechargeDate { get; set; }

    public int? MtbShare { get; set; }

    public int? TtbShare { get; set; }

    public int Status { get; set; }

    public string? AdditionalRemark { get; set; }

    public int? IsActive { get; set; }

    public int? Practice { get; set; }

    public virtual PracticeMaster? PracticeNavigation { get; set; }
}
