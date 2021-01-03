import React from 'react'
import style from './projects-page.m.scss'
import { ProjectCard } from './project-card'
import { CreateProjectCard } from './create-project-card'

const projects = []

export const ProjectsPage = () => {
  return <div className={style.root}>
    {projects.map(project => <ProjectCard key={project} />)}
    <CreateProjectCard onClick={() => { console.log('create project') }} />
  </div>
}
