import React, { useContext, useEffect, useState } from 'react'
import { RootCtx } from 'contexts'
import { Button, Label } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { withCancel } from 'utils/with-cancel'
import { Redirect } from 'react-router-dom'
import style from './home-page.m.scss'

export const HomePage = () => {
  const { loggedIn, logout, authenticationService, user } = useContext(RootCtx)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    if (!isLoggingOut) return
    const [apiLogout, cancel] = withCancel(authenticationService.logout())
    apiLogout.then(logout)
    return cancel
  }, [isLoggingOut, logout, authenticationService])

  if (!loggedIn) return <Redirect to='/login' />

  return <div className={style.root}>
    <header>
      <Label>{user.email}</Label>

      <Button
        minimal
        icon={IconNames.LOG_OUT}
        onClick={() => { setIsLoggingOut(true) }}
        loading={isLoggingOut}
      >
        Logout
      </Button>
    </header>
    <main>

    </main>
  </div>
}
