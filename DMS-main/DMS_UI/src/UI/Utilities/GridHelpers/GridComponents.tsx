
import { Link } from "react-router-dom"
import { UserInfo } from "../../../Domain/User"

export const UIDLinkComponent = (props: any, user: UserInfo, tableType?: string) => {
    const roles = user.Roles;

    if(tableType === 'Approval'){
        return <Link to={'/Approval/' + props.value}>{props.value}</Link>
    }

    if (roles?.includes('Demand Manager')) {
        return (
            <Link to={'/EditDemand/' + props.value}>{props.value}</Link>
        )
    }
    else return (
        <Link to={'/ViewDemand/' + props.value}>{props.value}</Link>
    )
}