import { MasterConfigType } from "../../../Domain/Config/ConfigMaster";
import { Demand } from "../../../Domain/Demand/Demand";
import { Service } from "../Service";

export interface ICommonService extends Service{
    GetAllConfigs(): Promise<MasterConfigType | null>;
}