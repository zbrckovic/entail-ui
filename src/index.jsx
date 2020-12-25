import React from 'react'
import ReactDOM from 'react-dom'
import { RootWrapper } from 'scafolding/root-wrapper'
import { FullscreenLoadingWrapper } from './scafolding/fullscreen-loading-wrapper'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { EntryPage } from './pages/entry-page'
import { AuthenticationWrapper } from './scafolding/authentication-wrapper'

ReactDOM.render(
  <RootWrapper>
    <AuthenticationWrapper>
      <FullscreenLoadingWrapper>
        <BrowserRouter>
          <Switch>
            <Route path="/">
              <EntryPage />
            </Route>
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </FullscreenLoadingWrapper>
    </AuthenticationWrapper>
  </RootWrapper>,
  document.getElementById('root')
)
