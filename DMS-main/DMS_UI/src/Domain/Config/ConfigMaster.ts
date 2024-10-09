export type DepartmentMasterType = {
    id: number;
    departmentId: number;
    departmentName: string;
    initiator_Name: string;
    global_Account_Manager_DE: string;
    global_Account_Manager_IN: string;
}

export type SkillMasterType = {
    id: number;
    skillId: string;
    skillName: string;
    skillType: string;
}

export type StatusMasterType = {
    id: number;
    status: string;
    roleMapping: string;
}

export type ContractorMasterType = {
    id: number,
    contractorId: number,
    contractorName: string
}

export type RoleMasterType = {
    id: number;
    role: string;
}

export type PracticeMasterType = {
    id: number;
    practiceName: string;
}

export type AllocationStatusType = {
    id: number;
    allocationStatus: string;
}

export type EmpDesignationMasterType = {
    id: number;
    designation: string;
}

export type EmpBandMaster = {
    id: number;
    band: string;
}

export type MasterConfigType = {
    departmentMaster: DepartmentMasterType[], 
    skillsMaster: SkillMasterType[], 
    statusMaster: StatusMasterType[], 
    roleMaster: RoleMasterType[],
    contractorMaster: ContractorMasterType[],
    practiceMaster: PracticeMasterType[],
    allocationStatus: AllocationStatusType[],
    emp_DesignationMaster: EmpDesignationMasterType[],
    emp_BandMaster: EmpBandMaster[]
}