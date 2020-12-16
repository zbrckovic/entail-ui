import { HomePage } from 'pages/home-page/home-page'
import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

export const Routes = () =>
  <BrowserRouter>
    <Switch>
      <Route path="/">
        <HomePage/>
      </Route>
      <Redirect to="/"/>
    </Switch>
  </BrowserRouter>
