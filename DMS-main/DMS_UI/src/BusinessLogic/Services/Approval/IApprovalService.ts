import { Approval } from "../../../Domain/Approval/Approval";
import { Service } from "../Service";

export interface IApprovalService extends Service{
    GetAllApprovals(): Promise<Approval[]>,
    UpdateApprovalStatus(approvals: Approval[]): Promise<{status: boolean, errorList: string[]}>
}