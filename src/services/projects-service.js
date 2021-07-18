import { projectMapper } from 'mappers'
import { map } from 'rxjs/operators'

export const ProjectsService = ({ apiService }) => ({
  getProjects () {
    return apiService
      .getProjects()
      .pipe(
        map(projects => projects.map(projectDTO => projectMapper.fromApi(projectDTO)))
      )
  },
  getProject (id) {
    return apiService
      .getProject(id)
      .pipe(map(projectDTO => projectMapper.fromApi(projectDTO)))
  },
  createProject (createRequest) {
    const createRequestDTO = projectMapper.toApiCreate(createRequest)

    return apiService
      .createProject(createRequestDTO)
      .pipe(map(projectDTO => projectMapper.fromApi(projectDTO)))
  }
})
