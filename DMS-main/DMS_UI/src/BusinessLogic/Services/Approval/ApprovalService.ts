import { Approval } from "../../../Domain/Approval/Approval";
import { PostWithBody } from "../../Utility/ApiHelper";
import { Service } from "../Service";
import { IApprovalService } from "./IApprovalService";

export class ApprovalService extends Service implements IApprovalService {

    async GetAllApprovals(): Promise<Approval[]> {
        let response = fetch(this.environmentValues.apiEndPoint + 'Demand/GetPendingDemands')
            .then(res => res.json())
            .then(res => res as Approval[])
        return response
    }

    async UpdateApprovalStatus(approvals: Approval[]): Promise<{status: boolean, errorList: string[]}> {
        try{
            let response = fetch(this.environmentValues.apiEndPoint + 'Demand/ActionDemands', PostWithBody(approvals))
            .then(res => res.json())
        return response;
        }
        catch(e){
            return  {status: false, errorList: ["Error connecting to service!"]}
        }
    }
}   