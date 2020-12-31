import React, { useContext, useEffect } from 'react'
import { RootCtx } from 'contexts'
import {
  Alignment,
  Button,
  Intent,
  Menu, MenuDivider,
  MenuItem,
  Navbar,
  Popover,
  Position
} from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Redirect } from 'react-router-dom'
import style from './home-page.m.scss'
import { useAsyncState } from 'utils/use-async-state'
import { useTranslation } from 'react-i18next'

export const HomePage = () => {
  const { loggedIn, logout, authenticationService, user } = useContext(RootCtx)
  const [logoutState, logoutActions] = useAsyncState()
  const { t } = useTranslation()

  console.log(user)

  useEffect(() => {
    if (!logoutState.inProgress) return

    const subscription = authenticationService
      .logout()
      .subscribe({
        complete () {
          logoutActions.resolve()
          logout()
        },
        error () {
          logoutActions.reject()
        }
      })

    return () => { subscription.unsubscribe() }
  }, [logoutState.inProgress, authenticationService, logoutActions, logout])

  if (!loggedIn) return <Redirect to='/login' />

  return <div className={style.root}>
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Entail</Navbar.Heading>
        <Navbar.Divider />
        <Button minimal icon={IconNames.PROJECTS} text={t('header.projectsLbl')} />
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Popover
          content={
            <Menu>
              <MenuItem
                text={t('header.logoutLbl')}
                icon={IconNames.LOG_OUT}
                onClick={() => { logoutActions.start() }}
              />
              {
                user.isAdmin() && <>
                  <MenuDivider />
                  <MenuItem
                    intent={Intent.DANGER}
                    text={t('header.usersLbl')}
                    icon={IconNames.USER}
                  />
                </>
              }
            </Menu>
          }
          position={Position.BOTTOM_LEFT}
        >
          <Button
            title={user.email}
            intent={user.isAdmin() ? Intent.DANGER : Intent.PRIMARY}
            minimal
            rightIcon={IconNames.USER}
          >
            {user.getUsername().slice(0, 16)}
          </Button>
        </Popover>
      </Navbar.Group>
    </Navbar>
    <main>
    </main>
  </div>
}
