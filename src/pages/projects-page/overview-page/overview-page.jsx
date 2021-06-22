import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import style from './overview-page.m.scss'
import { ProjectCard } from './project-card'
import { CreateProjectCard } from './create-project-card'
import { RootCtx } from 'contexts'
import { Spinner } from '@blueprintjs/core'
import { CreateProjectDialog } from './create-project-dialog'

export const OverviewPage = () => {
  const { projectsService } = useContext(RootCtx)
  const history = useHistory()
  const [projectsRetrievalRequest, setProjectsRetrievalRequest] = useState()
  const [projectsRetrievalState, setProjectsRetrievalState] = useState({ isLoading: false })

  useEffect(() => {
    setProjectsRetrievalState({ isLoading: true })
    const subscription = projectsService
      .getProjects()
      .subscribe(projects => { setProjectsRetrievalState({ result: projects, isLoading: false }) })

    return () => { subscription.unsubscribe() }
  }, [projectsRetrievalRequest, projectsService])

  const [isCreateProjectDialogOpen, setIsCreateProjectDialogOpen] = useState(false)
  const [projectToCreate, setProjectToCreate] = useState()
  const [projectCreationState, setProjectCreationState] = useState({ isLoading: false })

  useEffect(() => {
    if (projectToCreate === undefined) return

    setProjectCreationState({ isLoading: true })
    const subscription = projectsService
      .createProject(projectToCreate)
      .subscribe(project => {
        setProjectCreationState({ result: project, isLoading: false })
        setProjectsRetrievalRequest(Symbol('request'))
      })
    return () => { subscription.unsubscribe() }
  }, [projectToCreate, projectsService])

  const projects = projectsRetrievalState.result

  if (
    projects === undefined ||
    projectsRetrievalState.isLoading ||
    projectCreationState.isLoading
  ) {
    return <div className={style.loadingRoot}><Spinner/></div>
  }

  return <div className={style.root}>
    <div className={style.projectCardsContainer}>
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
      <CreateProjectCard
        onClick={() => { setIsCreateProjectDialogOpen(true) }}
      />
    </div>
    <CreateProjectDialog
      isOpen={isCreateProjectDialogOpen}
      onSubmit={project => {
        setIsCreateProjectDialogOpen(false)
        setProjectToCreate(project)
      }}
      onCancel={() => { setIsCreateProjectDialogOpen(false) }}
    />
  </div>
}
