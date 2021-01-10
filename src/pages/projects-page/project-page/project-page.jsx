import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RootCtx } from '../../../contexts'
import { Pre } from '@blueprintjs/core'

export const ProjectPage = () => {
  const { id } = useParams()
  const { projectsService } = useContext(RootCtx)

  const [projectRetrievalState, setProjectRetrievalState] = useState({ isLoading: false })

  useEffect(() => {
    setProjectRetrievalState({ isLoading: true })
    projectsService
      .getProject(id)
      .subscribe(project => { setProjectRetrievalState({ isLoading: false, project }) })
  }, [projectsService, id])

  return <Pre>
    {JSON.stringify(projectRetrievalState.project, undefined, 4)}
  </Pre>
}
