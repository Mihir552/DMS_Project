import { Demand } from "../../../Domain/Demand/Demand";
import { Service } from "../Service";

export interface IDemandService extends Service{
    GetAllDemands(): Promise<Demand[]>;
    AddNewDemand(demand: Demand): Promise<{status: boolean, errorList: string[]}>;
    UpdateDemand(demand: Demand): Promise<{status: boolean, errorList: string[]}>;
    DeleteDemand(uid: string): Promise<{status: boolean, errorList: string[]}>;
}