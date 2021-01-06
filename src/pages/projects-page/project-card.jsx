import React from 'react'
import { Card, Classes, H5 } from '@blueprintjs/core'

export const ProjectCard = ({ project, ...props }) => {
  return <Card interactive {...props}>
    <H5>{project?.name}</H5>
    <p className={Classes.TEXT_MUTED}>{project?.description}</p>
  </Card>
}
