import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Approval } from '../../Domain/Approval/Approval'

const initialState: { approvalList: Approval[], isLoading: boolean, approvalsToBeSync: string[] } = {
    approvalList: []
    ,
    isLoading: false,
    approvalsToBeSync: []
}

const ApprovalSlice = createSlice({
    name: 'approval',
    initialState,
    reducers: {
        setLoadingRequest: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

        setAllApprovals: (state, action: PayloadAction<Approval[]>) => {
            state.approvalList = action.payload;
        },

        updateApprovals: (state, action: PayloadAction<Approval[]>) => {
            // state.approvalList = state.approvalList.map(x =>
            //     action.payload.uid === x.uid ? action.payload : x
            // )
            // state.approvalsToBeSync.push(action.payload.uid)
        },

        resetSync: (state, action: PayloadAction<string[]>) => {
            state.approvalsToBeSync = state.approvalsToBeSync.filter(x => action.payload.includes(x))
        }
    }
})

export default ApprovalSlice.reducer;

export const {setAllApprovals, updateApprovals, setLoadingRequest} = ApprovalSlice.actions