import { HomePage } from 'pages/home-page'
import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

export const Routes = () =>
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <HomePage/>
      </Route>
      <Redirect to="/"/>
    </Switch>
  </BrowserRouter>

