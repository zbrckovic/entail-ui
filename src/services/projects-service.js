import { projectMapper } from 'mappers'
import { map } from 'rxjs/operators'

export const ProjectsService = ({ repository }) => ({
  getProjects () {
    return repository
      .getProjects()
      .pipe(
        map(projects => projects.map(projectDTO => projectMapper.fromApi(projectDTO)))
      )
  },
  getProject (id) {
    return repository
      .getProject(id)
      .pipe(map(projectDTO => projectMapper.fromApi(projectDTO)))
  },
  createProject (createRequest) {
    const createRequestDTO = projectMapper.toApiCreate(createRequest)

    return repository
      .createProject(createRequestDTO)
      .pipe(map(projectDTO => projectMapper.fromApi(projectDTO)))
  }
})
