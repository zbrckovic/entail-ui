import { Alignment, Button, Navbar } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { ProjectsPage } from 'pages/projects-page'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import style from './main-page.m.scss'

export const MainPage = () => {
  const history = useHistory()
  const { t } = useTranslation()

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
    </Navbar>
    <main>
      <Switch>
        <Route path="/projects">
          <ProjectsPage />
        </Route>
        <Redirect to="/projects" />
      </Switch>
    </main>
  </div>
}
