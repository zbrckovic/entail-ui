import { User } from 'models/user'
import moment from 'moment'
import { Deduction, Project, ProjectSummary } from './models/project'

export const userMapper = {
  fromApi ({ id, email, isEmailVerified, roles, createdAt }) {
    return User({ id, email, isEmailVerified, roles, createdAt: moment(createdAt) })
  }
}

export const projectSummaryMapper = {
  fromApi (projectSummaryDTO) {
    return ProjectSummary({
      ...projectSummaryDTO,
      createdAt: moment(projectSummaryDTO.createdAt)
    })
  }
}

export const projectMapper = {
  fromApi (projectDTO) {
    return Project({
      ...projectDTO,
      createdAt: moment(projectDTO.createdAt),
      deductions: projectDTO.deductions.map(deductionDTO => deductionMapper.fromAPI(deductionDTO))
    })
  }
}

export const projectCreateRequestMapper = {
  toApi (projectCreateRequest) { return projectCreateRequest }
}

export const deductionMapper = ({
  fromAPI ({ id, name, description, steps, syms, presentations, theorem, createdAt }) {
    return Deduction({
      id,
      name,
      description: description ?? undefined,
      steps,
      syms,
      presentations,
      theorem,
      createdAt: moment(createdAt)
    })
  }
})
