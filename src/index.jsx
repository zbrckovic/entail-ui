import React from 'react'
import ReactDOM from 'react-dom'
import { RootWrapper } from 'root-wrapper'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MainPage } from './pages/main-page'
import { LoginPage } from './pages/entry-page/login-page'
import { RegisterPage } from './pages/entry-page/register-page'
import { ForgotPasswordPage } from './pages/entry-page/forgot-password-page'
import { ChangePasswordPage } from './pages/entry-page/change-password-page'

ReactDOM.render(
  <RootWrapper>
    <BrowserRouter>
      <Switch>
        <Route exact path='/login'>
          <LoginPage />
        </Route>
        <Route exact path='/register'>
          <RegisterPage />
        </Route>
        <Route exact path='/forgot-password'>
          <ForgotPasswordPage />
        </Route>
        <Route exact path='change-password/:token'>
          <ChangePasswordPage />
        </Route>
        <Route path='/'>
          <MainPage />
        </Route>
      </Switch>
    </BrowserRouter>
  </RootWrapper>,
  document.getElementById('root')
)
