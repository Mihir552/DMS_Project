import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../BusinessLogic/Store/store"
import { Logout } from "../../../BusinessLogic/Store/UserSlice";

export const UserInfo = () => {
    const user = useSelector((state: RootState) => state.User)
    const dispatch = useDispatch();
    const getFormattedDateTime = (miliseconds: number) => {
        return new Date(miliseconds).toUTCString()
    }
    return (<>
    <h1 style={{marginLeft: '10%'}}>User Info: </h1>
    <div style={{display: 'grid', justifyItems: 'center', justifyContent: 'center', alignItems: 'center', gridTemplateColumns: '1fr 1fr', gap: '1em', paddingInline: '25%', marginTop: '3em'}}>
        <div>Name: </div><div>{user.userInfo?.Name}</div>
        <div>Email: </div><div>{user.userInfo?.Email}</div>
        <div>EMP ID: </div><div>{user.userInfo?.EmpID}</div>
        <div>Prctice: </div><div>{user.userInfo?.Practice}</div>
        <div>Roles: </div><div>{user.userInfo?.Roles}</div>
        <div>Login Expiry: </div><div>{user.userInfo?.TokenExpiry}</div>
        <div style={{gridColumn: '1 / 3'}}><button className="LinkButton" onClick={() => dispatch(Logout())}>Logout</button></div>
    </div>
    </>
    )
}