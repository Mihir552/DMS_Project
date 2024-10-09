import { useDispatch, useSelector } from "react-redux";
import { GridComponent } from "../Common/GridComponent";
import { RootState } from "../../../BusinessLogic/Store/store";
import { useState } from "react";
import { Approval } from "../../../Domain/Approval/Approval";
import ApprovalConfirmationModal from "../Approval/ApprovalConfirmationModal";
import { updateApprovals } from "../../../BusinessLogic/Store/ApprovalSlice";
import EmployeeListModal from "../Employee/EmployeeListModal";
import { assignEmployee, reloadEmployees } from "../../../BusinessLogic/Store/EmployeeSlice";

export const ApprovalPage = () => {
    const role = useSelector((state: RootState) => state.User.userInfo?.Roles)
    
    const approvals = useSelector((state: RootState) => state.Approval.approvalList);
    const [selectedRows, setSelectedRow] = useState([] as Approval[]);
    const [showApprovalModal, setShowApprovalModal] = useState<{ display: boolean, status: 'Approve' | 'Reject', ID: string[] }>({ display: false, status: 'Approve', ID: [] });
    const [showEmployeeModal, setShowEmployeeModal] = useState<{display: boolean, Uid: string}>({display: false, Uid: ''})
    const dispatch = useDispatch();

    function updateSelectedRows(rows: Approval[]) {
        setSelectedRow(rows)
    }

    function showModalDialog(value: 'Approve' | 'Reject', id?: string | null) {
        setShowApprovalModal({ display: !showApprovalModal.display, status: value, ID: selectedRows.map(x => x.uid) });
        if (id) {
            setShowApprovalModal({ display: !showApprovalModal.display, status: value, ID: [id] });
        }

    }

    function UpdateApproval(ID: string[], action: 'Approve' | 'Reject', comment: string) {
        if (comment) {
            let Currentapprovals = [...approvals].filter(x => ID.includes(x.uid)).map(x => ({ ...x, action: action === 'Approve', remark: comment }))
            dispatch(updateApprovals(Currentapprovals));
        }
        setShowApprovalModal(val => ({ ...val, display: false }))
    }

    function ActionCallback(value: 'Approve' | 'Reject' | 'Unassign' | 'ShowEmployeeList' | 'Cancel' | 'Assign', id?: string | null, empId?: number){
        if(value === 'Approve' || value == 'Reject'){
            showModalDialog(value, id)
        }
        if(value === 'Assign'){
            dispatch(assignEmployee({empId: empId!, assignEmployee: true, Uid: showEmployeeModal.Uid}))
            setShowEmployeeModal({display: false, Uid: ''})
        }
        if(value === 'Unassign'){
            dispatch(assignEmployee({empId: empId!, assignEmployee: false, Uid: id!}))
        }
        if(value === 'ShowEmployeeList'){
            dispatch(reloadEmployees())
            setShowEmployeeModal({display: true, Uid: id!})
        }
        if(value === 'Cancel'){
            setShowEmployeeModal({display: false, Uid: ''})
        }
    }
    
        return (
            <div style={{ margin: '20px' }}>
            {showApprovalModal.display && <ApprovalConfirmationModal ID={showApprovalModal.ID} action={showApprovalModal.status} callback={UpdateApproval} />}
            {showEmployeeModal.display && <EmployeeListModal uid={showEmployeeModal.Uid} callback={ActionCallback} />}
            <div style={{ margin: '20px', minHeight: '3em' }}>
                {role?.includes('Demand Manager') ? (
                    <input className="LinkButton" style={{ display: selectedRows.length > 0 ? 'inline' : 'none' }} type="button" value={`Send for Approval ${selectedRows.length}`} onClick={() => showModalDialog('Approve')} />
                ) : (
                    <>
                        <input className="LinkButton" style={{ backgroundColor: 'orange', display: selectedRows.length > 0 ? 'inline' : 'none' }} type="button" value={`Reject ${selectedRows.length}`} onClick={() => showModalDialog('Reject')} />
                        <input className="LinkButton" style={{ display: selectedRows.length > 0 ? 'inline' : 'none' }} type="button" value={`Approve ${selectedRows.length}`} onClick={() => showModalDialog('Approve')} />
                    </>
                )}
            </div>
            <GridComponent approvals={approvals} rowsSelected={updateSelectedRows} actionCallBack={ActionCallback} />
        </div>
    );
}