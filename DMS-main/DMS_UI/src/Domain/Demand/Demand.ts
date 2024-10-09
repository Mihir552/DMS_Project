import { DataRouteMatch } from "react-router-dom";

export interface Demand {
    id: number;
    uid: string;
    asset: string;
    role: number;
    roleDetails: string;
    yearsOfExp: number;
    department: number;
    practice: number;
    raisedBy: string;
    primarySkills: number;
    secondarySkills: string[];
    skillDetails: string;
    requiredByDate: string | null;
    raisedOn: string | null;
    kTstartDate: string;
    kTendDate: string;
    hlcApproval: boolean;
    hlcApprovalDate: string | null;
    jdFileLocation: string;
    demandInitiationFileLocation: string;
    contractorReplacement: number;
    otherContractor: string;
    rechargeDate: string | null;
    mtbShare: number;
    tTBShare: number;
    status: number;
    additionalRemark: string;
    isActive: boolean;
}



export enum DemandStatus
{
    Initiated,
    DemandManagerAprovalPending,
    DemandManagerAprovalRejected,
    DemandApprover_PH_ApprovalPending,
    DemandApprover_PH_ApprovalRejected,
    DemandApprover_DSH_ApprovalPending,
    DemandApprover_DSH_ApprovalRejected,
    SupplyManagerApprovalPending,
    SupplyManagerApprovalRejected,
    SupplyApproverApprovalPending,
    SupplyApproverApprovalRejected,
    SupplyRecruiterApprovalPending,
    SupplyRecruiterApprovalRejected,
    Fulfilled
}