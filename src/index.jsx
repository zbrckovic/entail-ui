import React from 'react'
import ReactDOM from 'react-dom'
import { RootWrapper } from 'root-wrapper'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { EntryPage } from './pages/entry-page'

ReactDOM.render(
  <RootWrapper>
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <EntryPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </RootWrapper>,
  document.getElementById('root')
)
