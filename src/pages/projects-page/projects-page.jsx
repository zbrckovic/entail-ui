import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import style from './projects-page.m.scss'
import { ProjectCard } from './project-card'
import { CreateProjectCard } from './create-project-card'
import { RootCtx } from '../../contexts'
import { Spinner } from '@blueprintjs/core'

export const ProjectsPage = () => {
  const { projectsService } = useContext(RootCtx)
  const history = useHistory()
  const [projectsRetrievalState, setProjectsRetrievalState] = useState()

  useEffect(() => {
    setProjectsRetrievalState({ isLoading: true })
    const subscription = projectsService
      .getProjects()
      .subscribe(projects => {
        setProjectsRetrievalState({ result: projects, isLoading: false })
      })

    return () => { subscription.unsubscribe() }
  }, [projectsService])

  if (projectsRetrievalState === undefined || projectsRetrievalState.isLoading) {
    return <div className={style.loadingRoot}><Spinner /></div>
  }

  const projects = projectsRetrievalState.result

  return <div className={style.root}>
    {
      projects.map(
        project =>
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => { history.push(`/projects/${project.id}`) }}
          />
      )
    }
    <CreateProjectCard onClick={() => {}} />
  </div>
}
