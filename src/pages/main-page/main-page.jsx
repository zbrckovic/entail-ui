import React, { useContext, useEffect } from 'react'
import { RootCtx } from 'contexts'
import {
  Alignment,
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  Navbar,
  Popover,
  Position
} from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import style from './main-page.m.scss'
import { useAsyncState } from 'utils/use-async-state'
import { useTranslation } from 'react-i18next'
import { UsersPage } from 'pages/users-page'
import { HomePage } from 'pages/home-page'
import { ProjectsPage } from '../projects-page/projects-page'

export const MainPage = () => {
  const history = useHistory()
  const { loggedIn, logout, authenticationService, user } = useContext(RootCtx)
  const [logoutState, logoutActions] = useAsyncState()
  const { t } = useTranslation()

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
        <Navbar.Heading
          className={style.headingTitle}
          onClick={() => { history.push('/') }}
        >
          Entail
        </Navbar.Heading>
        <Navbar.Divider />
        <Button
          minimal
          icon={IconNames.PROJECTS}
          text={t('header.projectsLbl')}
          onClick={() => { history.push('/projects') }}
        />
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
                    text={t('header.usersLbl')}
                    icon={IconNames.USER}
                    onClick={() => { history.push('/users') }}
                  />
                </>
              }
            </Menu>
          }
          position={Position.BOTTOM_LEFT}
        >
          <Button
            title={user.email}
            minimal
            rightIcon={IconNames.USER}
          >
            {user.getUsername().slice(0, 16)}
          </Button>
        </Popover>
      </Navbar.Group>
    </Navbar>
    <main>
      <Switch>
        <Route path='/users'>
          <UsersPage />
        </Route>
        <Route path='/projects'>
          <ProjectsPage />
        </Route>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </main>
  </div>
}
