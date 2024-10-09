import React, { useEffect } from 'react';
import './App.css';
import { NavBar } from './UI/Components/Common/NavBar';
import { Login } from './UI/Components/Pages/Login';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './BusinessLogic/Store/store';
import { CheckLogin } from './BusinessLogic/Store/UserSlice';
import { init } from './BusinessLogic/Store/DemandSlice';

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.User.loginState)
  const dispatch = useDispatch();

  useEffect(
    () => {
      console.log('Init running')
      dispatch(CheckLogin());
      isLoggedIn && dispatch(init());
    }, [isLoggedIn]
  )
  return (
    <>
      <NavBar isLoggedIn={isLoggedIn === 'LoggedIn'}></NavBar>
      {
        isLoggedIn === 'LoggedIn' ?
          <RouterProvider router={router} /> :
          <Login />
      }
    </>
  );
}

export default App;
