import React, { useContext, useEffect, useState } from 'react'
import { RootCtx } from 'contexts'
import { Button } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { withCancel } from 'utils/with-cancel'
import { Redirect } from 'react-router-dom'

export const HomePage = () => {
  const { setIsLoggedIn, isLoggedIn, authenticationService } = useContext(RootCtx)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    if (!isLoggingOut) return
    const [logout, cancel] = withCancel(authenticationService.logout())
    logout.then(() => { setIsLoggedIn(false) })
    return cancel
  }, [isLoggingOut, setIsLoggedIn, authenticationService])

  if (!isLoggedIn) {
    console.log('redirecting')
    return <Redirect to='/login' />
  }

  return <div>
    <Button
      icon={IconNames.LOG_OUT}
      onClick={() => { setIsLoggingOut(true) }}
      loading={isLoggingOut}
    >
      Logout
    </Button>
  </div>
}
