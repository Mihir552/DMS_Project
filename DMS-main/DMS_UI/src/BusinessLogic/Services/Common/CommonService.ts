import { Demand } from "../../../Domain/Demand/Demand";
import { PostWithBody } from "../../Utility/ApiHelper";
import { EnvironmentValues } from "../IServiceProvider";
import { Service } from "../Service";
import { ICommonService } from "./ICommonService";
import {MasterConfigType } from "../../../Domain/Config/ConfigMaster";

export class CommonService extends Service implements ICommonService{
    async GetAllConfigs(): Promise<MasterConfigType | null> {
        try{
            let response = await fetch(this.environmentValues.apiEndPoint + 'Master/GetAllMaster');
            let result = await response.json();

            return result as MasterConfigType
        }
        catch(e){
            return null;
        }
    }
}