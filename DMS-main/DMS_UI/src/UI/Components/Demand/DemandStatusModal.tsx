import { Link } from "react-router-dom"
import Modal from "../Common/Modal"
import { useDispatch } from "react-redux"
import { setLoader } from "../../../BusinessLogic/Store/DemandSlice";
import { error } from "console";

export const DemandStatusModal = (props: {error: string[], isSuccess: boolean, isNewDemand: boolean}) => {
    const dispatch = useDispatch();
    return <Modal>
        <dialog open style={{ height: '30%', width: '40%', zIndex: 10, boxShadow: '#5757574a 5px 5px 4px 3px', border: 'transparent' }}>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'stretch', flexDirection: 'column', height: '79%', marginTop: '4%', marginLeft: '7%', width: '80%' }}>
            {props.isSuccess ?  
            <div>
                <h2 style={{marginBlock: '10%'}}>Success: </h2>
                <Link className="LinkButton" to={'/'} onClick={e => dispatch(setLoader({isLoading: false, isActionSuccess: false}))}>Go to Dashboard</Link>
                {!props.isNewDemand &&
                <input className="LinkButton" style={{ display: 'inline'}} type="button" value={'Stay Here'} onClick={e => dispatch(setLoader({isLoading: false, isActionSuccess: false}))} /> }
            </div>
            : ''}

            {props.error.length > 0 ?
            
            <>
            <h2 style={{marginBlock: '5%'}}>Error: </h2>
            {' - ' + props.error.join('\n - ')}
            <input className="LinkButton" style={{ display: 'inline'}} type="button" value={'Ok'} onClick={e => dispatch(setLoader({isLoading: false, isActionSuccess: false, errorList: {id: '-1', error: []}}))} />
            </>
            : ''}
        </div>
        </dialog>
    </Modal>
}