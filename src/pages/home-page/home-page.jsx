import React, { useContext, useEffect, useState } from 'react'
import { RootCtx } from '../../contexts'
import { Button } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { authenticationService } from '../../services/authentication-service'
import { withCancel } from '../../utils/with-cancel'

export const HomePage = () => {
  const { setIsLoggedIn } = useContext(RootCtx)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    if (!isLoggingOut) return
    const [logout, cancel] = withCancel(authenticationService.logout())
    logout.then(() => { setIsLoggedIn(false) })
    return cancel
  }, [isLoggingOut, setIsLoggedIn])

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
