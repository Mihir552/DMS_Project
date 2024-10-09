import { ChangeEvent, useState } from 'react'
import './Login.css'
import { log } from 'console'
import { useDispatch } from 'react-redux'
import { LoginWithPasswordChange, Login as LoginAction} from '../../../BusinessLogic/Store/UserSlice'

export const Login = () => {

    const dispatch = useDispatch();
    const [loginInput, setLoginInput] = useState({ EmpID: '', password: '', confirmPassword: '', isPasswordChange: false })

    const SubmitLoginAction = () => {
        loginInput.isPasswordChange ? 
            dispatch(LoginWithPasswordChange({userName: loginInput.EmpID, password: loginInput.password, newPassword: loginInput.confirmPassword}))
            : 
            dispatch(LoginAction({userName: loginInput.EmpID, password: loginInput.password}))
    }

    return (
        <div className="LoginPage">
            <div className="LoginSection">
                <span>
                    Login
                </span>
                <span className='LoginForm'>
                    <label htmlFor='Emp_ID'>Emp ID:</label>
                    <input id='Emp_ID' type='number' inputMode='numeric' placeholder='EMP ID' onChange={(e) => setLoginInput(prev => ({ ...prev, EmpID: e.target.value }))}></input>
                    <label htmlFor='Password'>Password: </label>
                    <input id="Password" type='password' placeholder='Password' onChange={(e) => setLoginInput(prev => ({ ...prev, password: e.target.value }))}></input>
                    {loginInput.isPasswordChange ? <>

                        <label htmlFor='NewPassword'>New Password: </label>
                        <input id="NewPassword" type='password' placeholder='Confirm Password' onChange={(e) => setLoginInput(prev => ({ ...prev, confirmPassword: e.target.value }))}></input>
                    </> :
                        ''
                    }
                    <input className='LoginButton' onClick={() => SubmitLoginAction()} type='button' value={loginInput.isPasswordChange ? 'Change Password & Login' : 'Login'} disabled={loginInput.EmpID === '' || loginInput.password === '' || (loginInput.isPasswordChange && loginInput.confirmPassword === '')} ></input>
                    <label className='ChangePassword' onClick={(e) => setLoginInput(prev => ({ ...prev, isPasswordChange: !prev.isPasswordChange }))}>{loginInput.isPasswordChange ? 'Do not change Password' : 'Change Password on Login'}</label>
                </span>
            </div>
        </div>

    )
}