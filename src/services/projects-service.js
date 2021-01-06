import { projectMapper } from '../mappers'
import { map } from 'rxjs/operators'

export const ProjectsService = ({ apiService }) => ({
  getProjects: function () {
    return apiService
      .getProjects()
      .pipe(
        map(({ projects }) => projects),
        map(projects => projects.map(projectDTO => projectMapper.fromApi(projectDTO)))
      )
  }
})
