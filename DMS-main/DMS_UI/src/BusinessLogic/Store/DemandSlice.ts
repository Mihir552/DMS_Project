import { PayloadAction, createSlice, isAction } from "@reduxjs/toolkit";
import { Demand, DemandStatus } from "../../Domain/Demand/Demand";
import { act } from "react-dom/test-utils";

const defaultDemandState: Demand ={
    id: -1,
    uid: '',
    asset: "",
    role: 1,
    roleDetails: "",
    yearsOfExp: 1.3,
    department: 3,
    practice:1,
    raisedBy: "2",
    primarySkills: 2,
    secondarySkills: ["2"],
    skillDetails: "",
    raisedOn: null,
    hlcApproval: false,
    hlcApprovalDate: null,
    jdFileLocation: "",
    demandInitiationFileLocation: "--",
    contractorReplacement: -1,
    otherContractor: "",
    rechargeDate: null,
    mtbShare: 0,
    status: 2,
    additionalRemark: "",
    isActive: true,
    requiredByDate: null,
    kTstartDate: '',
    kTendDate: '',
    tTBShare: 50
}

const initialState: {sampleDemand: Demand, demandsList: Demand[], isLoading: boolean, lastLoad: number, isActionSuccess: boolean, errorList: {id: string, error: string[]}} = 
            {
                sampleDemand: defaultDemandState,
                demandsList: [],
                isLoading: false,
                lastLoad: new Date().getTime() - 2000,
                isActionSuccess: false,
                errorList: {id: "-1", error: []}
            }

const DemandSlice = createSlice({
    name: 'demand',
    initialState,
    reducers: {
        addDemand: (state, action: PayloadAction<Demand>) => {
            state.demandsList.push(action.payload);
        },
        removeDemand: (state, action: PayloadAction<string>) => {
            state.demandsList = state.demandsList.filter(x => x.uid !== action.payload)
        },
        clearDemandList: (state) => {
            state.demandsList = [];
        },
        fillDemandList: (state, action: PayloadAction<Demand[]>) => {
            state.demandsList = action.payload;
        },
        editDemand: (state, action: PayloadAction<Demand>) => {
            state.demandsList = state.demandsList.map(x => x.uid === action.payload.uid ? action.payload : x)
        },
        init: (state) => {
            console.log('Updating init')
            state.lastLoad = new Date().getTime()
        },
        setLoader(state, action: PayloadAction<{isLoading: boolean, isActionSuccess?: boolean, errorList?: {id: string, error: string[]}}>){
            state.isLoading = action.payload.isLoading;
            state.isActionSuccess = action.payload.isActionSuccess !== undefined ? action.payload.isActionSuccess : state.isActionSuccess;
            state.errorList = action.payload.errorList !== undefined ? action.payload.errorList : state.errorList;
        },
    }
});


export const {addDemand, clearDemandList, fillDemandList, removeDemand, editDemand, init, setLoader} = DemandSlice.actions;
export default DemandSlice.reducer;