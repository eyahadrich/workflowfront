import React from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter, Route, Switch ,Redirect} from 'react-router-dom';
import MenuTabs from './Components/MenuTabs/MenuTabs';
import LoginForm from './Components/LoginForm/LoginForm';

export const Router =  () => {


  const userAuthentification = useSelector(state => state.LoginReducer.userAuthentification);


  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {userAuthentification ? <Redirect to="/home" /> : <LoginForm />}
        </Route>
        <Route exact path="/home">
          {userAuthentification ? <MenuTabs /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

