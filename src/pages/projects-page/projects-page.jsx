import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import { ProjectPage } from './project-page'
import React from 'react'
import { OverviewPage } from './overview-page'

export const ProjectsPage = () => {
  const { path } = useRouteMatch()

  return <Switch>
    <Route exact path={path}>
      <OverviewPage />
    </Route>
    <Route path={`${path}/:id`}>
      <ProjectPage />
    </Route>
    <Redirect to={path} />
  </Switch>
}
