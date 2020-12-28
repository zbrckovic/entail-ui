import React, { useContext, useEffect } from 'react'
import { RootCtx } from 'contexts'
import { Button, Label } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { withCancel } from 'utils/with-cancel'
import { Redirect } from 'react-router-dom'
import style from './home-page.m.scss'
import { useAsyncState } from 'utils/use-async-state'

export const HomePage = () => {
  const { loggedIn, logout, authenticationService, user } = useContext(RootCtx)
  const [logoutState, logoutActions] = useAsyncState()

  useEffect(() => {
    if (!logoutState.inProgress) return
    const [logoutPromise, cancel] = withCancel(authenticationService.logout())
    logoutPromise.then(
      () => {
        logoutActions.resolve()
        logout()
      },
      logoutActions.reject
    )
    return cancel
  }, [logoutState.inProgress, authenticationService, logoutActions, logout])

  if (!loggedIn) return <Redirect to='/login' />

  return <div className={style.root}>
    <header>
      <Label>{user.email}</Label>
      <Button
        minimal
        icon={IconNames.LOG_OUT}
        onClick={() => { logoutActions.start() }}
        loading={logoutState.inProgress}
      >
        Logout
      </Button>
    </header>
    <main>

    </main>
  </div>
}
