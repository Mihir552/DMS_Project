namespace DemandMgmt.Domain.Model.Master
{
    public class Master
    {
        public List<DepartmentMaster>? departmentMaster { get; set; }
        public List<SkillsMaster>? SkillsMaster { get; set; }
        public List<StatusModel>? StatusMaster { get; set; }
        public List<RoleMaster>? RoleMaster { get; set; }
        public List<ContractorMaster>? ContractorMaster { get; set; }
        public List<PracticeMaster>? practiceMaster { get; set; }

        public List<AllocationStatusMaster>? allocationStatus { get; set; }

        public List<EMP_DesignationMaster>? emp_DesignationMaster { get; set; }

        public List<EMP_BandMaster>? emp_BandMaster { get; set; }
    }
}
