import { projectMapper } from '../mappers'
import { map } from 'rxjs/operators'

export const ProjectsService = ({ apiService }) => ({
  getProjects () {
    return apiService
      .getProjects()
      .pipe(
        map(({ projects }) => projects),
        map(projects => projects.map(projectDTO => projectMapper.fromApi(projectDTO)))
      )
  },
  createProject (project) {
    const projectDTOOutgoing = projectMapper.toApi(project)

    return apiService
      .createProject(projectDTOOutgoing)
      .pipe(
        map(projectDTOIncoming => projectMapper.fromApi(projectDTOIncoming))
      )
  }
})
