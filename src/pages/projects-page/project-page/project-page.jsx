import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RootCtx, SymCtx } from 'contexts'
import { primitiveSyms, primitivePresentations } from '@zbrckovic/entail-core'
import { DeductionEditor } from '../../../components/deduction-editor'
import style from './project-page.m.scss'

export const ProjectPage = () => {
  const { id } = useParams()
  const { projectsService } = useContext(RootCtx)

  const [projectRetrievalState, setProjectRetrievalState] = useState({ isLoading: false })

  const [symCtx] = useState({
    syms: primitiveSyms,
    presentations: primitivePresentations
  })

  useEffect(() => {
    setProjectRetrievalState({ isLoading: true })
    projectsService
      .getProject(id)
      .subscribe(project => { setProjectRetrievalState({ isLoading: false, project }) })
  }, [projectsService, id])

  const { project } = projectRetrievalState
  if (project === undefined) return <div>Loading</div>

  return <div className={style.root}>
    <SymCtx.Provider value={symCtx}>
      <DeductionEditor
        propositionalRulesSet={project.propositionalRulesSet}
        isFirstOrder={project.isFirstOrder}
        onFinish={({ deduction, symCtx }) => {
          console.log(deduction)
          console.log(symCtx)
        }}
      />
    </SymCtx.Provider>
  </div>
}
