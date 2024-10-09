import { useState } from "react";
import Modal from "../Common/Modal";

const ApprovalConfirmationModal = (props: { ID: string[], action: 'Approve' | 'Reject', callback: any }) => {
    const [comment, setComment] = useState('');
    return <Modal>

        <dialog open style={{ height: '50%', width: '50%', zIndex: 10, boxShadow: '#5757574a 5px 5px 4px 3px', border: 'transparent' }}>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'stretch', flexDirection: 'column', height: '79%', marginTop: '4%', marginLeft: '7%', width: '80%' }}>
                <div>
                    <b style={{ fontSize: '1.2em' }}>
                        {props.action} for {props.ID.join(', ')}?
                    </b>
                </div>
                <div>
                    <textarea placeholder="Comment" style={{ width: '100%', height: '80px' }} minLength={2} onChange={e => setComment(e.target.value)} value={comment} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <input className="LinkButton" style={{ backgroundColor: 'orange', cursor: comment.length < 2 ? 'not-allowed' : 'pointer' }} type="button" value={"Submit"} disabled={comment.length < 2} onClick={e => props.callback(props.ID, props.action, comment)} />
                    <input className="LinkButton" type="button" value={"Cancel"} onClick={e => props.callback(props.ID, props.action)} />
                </div>
            </div>
        </dialog>
    </Modal>
}

export default ApprovalConfirmationModal;