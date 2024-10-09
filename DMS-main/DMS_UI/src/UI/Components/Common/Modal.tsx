import ReactDOM from "react-dom"

const Modal = (props: { children: JSX.Element }) => {
    return ReactDOM.createPortal(
        <div className="ModalParent">
            <div className="ModalContent">
                {props.children}
            </div>
        </div>, document.getElementById('dialogPortal')!)
}

        export default Modal