import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { RootWrapper } from 'components/root-wrapper'
import { HomePage } from 'pages/home-page'

export const Root = () => <RootWrapper>
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <HomePage/>
      </Route>
      <Redirect to="/"/>
    </Switch>
  </BrowserRouter>
</RootWrapper>
