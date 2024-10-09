using System;
using System.Collections.Generic;

namespace DemandMgmt.Business.DataBase;

public partial class Employee
{
    public int EmpId { get; set; }

    public string EmpName { get; set; } = null!;

    public DateOnly Doj { get; set; }

    public int? PracticeId { get; set; }

    public int Band { get; set; }

    public int? Designation { get; set; }

    public int? ManagerId { get; set; }

    public int? SkillId { get; set; }

    public decimal YearsOfExperience { get; set; }

    public virtual AllocationMapping? AllocationMapping { get; set; }

    public virtual EmpBandMaster BandNavigation { get; set; } = null!;

    public virtual EmpDesignationMaster? DesignationNavigation { get; set; }

    public virtual PracticeMaster? Practice { get; set; }

    public virtual SkillsMaster? Skill { get; set; }
}
