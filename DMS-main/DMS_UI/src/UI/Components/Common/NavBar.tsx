import './NavBar.css'
import { ReactComponent as UserSvg } from '../../../Assets/user.svg'
import { useSelector } from 'react-redux'
import { RootState } from '../../../BusinessLogic/Store/store'
import { useNavigate } from 'react-router-dom'
export const NavBar = (props: { isLoggedIn: boolean }) => {

    const user = useSelector((state: RootState) => state.User.userInfo)
    const approvals = useSelector((state: RootState) => state.Approval.approvalList)
    const navigateToUserInfo = (): void => {
        window.location.assign('#/UserInfo')
    }

    const navigateToHome = (): void => {
        window.location.assign('#/')
    }

    return (
        <div className="NavBar">
            <div className='brand' onClick={navigateToHome} >Demand Management System</div>
            <div className='NavLinks'>
                {props.isLoggedIn ?
                    <><a href='#/'>Dashboard</a>
                        <a href='#/Approval'><span>Actions</span> {approvals.length > 0 ? <span className='highlighIcon'>{approvals.length}</span> : ''}</a>
                    </>
                    : ''}
            </div>
            <div className='NavButtons'>
                <UserSvg onClick={navigateToUserInfo} style={{ transform: 'scale(1.57)' }} />
            </div>
        </div>
    )
}