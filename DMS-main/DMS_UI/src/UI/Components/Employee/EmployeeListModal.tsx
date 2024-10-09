import { useSelector } from "react-redux"
import Modal from "../Common/Modal"
import { RootState } from "../../../BusinessLogic/Store/store"
import { Spinner } from "../Common/Spinner"
import { GridComponent } from "../Common/GridComponent"

const EmployeeListModal = (props: { uid: string, callback: any }) => {
    const employees = useSelector((state: RootState) => state.Employee.employees)
    const isLoading = useSelector((state: RootState) => state.Employee.isLoading)



    return <Modal>
        <dialog open style={{ height: '70%', width: '90%', zIndex: 10, boxShadow: '#5757574a 1px 0px 4px 7px', border: 'transparent' }}>
            <div style={{ width: '100%', height: '80%' }}>
                <h2>Assign Employee for {props.uid}:</h2>
                {isLoading ? <Spinner /> : <GridComponent employeeAssignmentUid={props.uid} actionCallBack={props.callback}></GridComponent>}
                <input className="LinkButton" type="button" value={"Cancel"} onClick={e => props.callback('Cancel')} />
            </div>
        </dialog>
    </Modal>
}

export default EmployeeListModal;