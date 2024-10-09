import { Demand } from "../../../Domain/Demand/Demand";
import { PostWithBody } from "../../Utility/ApiHelper";
import { EnvironmentValues } from "../IServiceProvider";
import { Service } from "../Service";
import { IDemandService } from "./IDemandService";

export class DemandService extends Service implements IDemandService{
    private ChangeDates(demand: Demand): Demand {
        demand = {
            ...demand,
            raisedOn: (demand.raisedOn && demand.raisedOn.length > 2) ? new Date(demand.raisedOn).toISOString().substring(0, 10) : null,
            requiredByDate: (demand.requiredByDate && demand.requiredByDate.length > 2) ? new Date(demand.requiredByDate).toISOString().substring(0, 10) : null,
            kTstartDate: (demand.kTstartDate && demand.kTstartDate.length > 2) ? new Date(demand.kTstartDate).toISOString().substring(0, 10) : '',
            kTendDate: (demand.kTendDate && demand.kTendDate.length > 2) ? new Date(demand.kTendDate).toISOString().substring(0, 10) : '',
            hlcApprovalDate: (demand.hlcApprovalDate && demand.hlcApprovalDate.length > 2) ? new Date(demand.hlcApprovalDate).toISOString().substring(0, 10) : null,
            rechargeDate: (demand.rechargeDate && demand.rechargeDate?.length > 2) ? new Date(demand.rechargeDate).toISOString().substring(0, 10) : null
        }
        return demand;
    }
    async GetAllDemands(): Promise<Demand[]> {
        try{
            let response = await fetch(this.environmentValues.apiEndPoint + 'Demand/GetAllDemand');
            let result = await response.json();

            return result as Demand[]

        }
        catch(e){
            return [];
        }
        
    }
    
    async AddNewDemand(demand: Demand): Promise<{status: boolean, errorList: string[]}> {
        try{
            demand = this.ChangeDates(demand)
            let response = await fetch(this.environmentValues.apiEndPoint + 'Demand/AddNewDemand', PostWithBody(demand))
            let result = await response.json();

            return result;
        }
        catch(e){
            return {status: false, errorList: ["Error connecting to service!"]}
        }
    }
    
    async UpdateDemand(demand: Demand): Promise<{status: boolean, errorList: string[]}> {
        try{
            demand = this.ChangeDates(demand)
            let response = await fetch(this.environmentValues.apiEndPoint + 'Demand/UpdateData', PostWithBody(demand))
            let result = await response.json();

            return result;
        }
        catch(e){
            return  {status: false, errorList: ["Error connecting to service!"]}
        }
    }
    
    async DeleteDemand(uid: string): Promise<{status: boolean, errorList: string[]}> {
        try{
            let response = await fetch(this.environmentValues.apiEndPoint + 'Demand/DeleteData', PostWithBody(uid))
            let result = await response.json();

            return result;
        }
        catch(e){
            return  {status: false, errorList: ["Error connecting to service!"]}
        }
    }

}