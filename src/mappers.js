import { User } from 'models/user'
import moment from 'moment'
import { Deduction, Project } from './models/project'

export const userMapper = {
  fromApi ({ createdAt, ...userDTORest }) {
    return User({ ...userDTORest, createdAt: moment(createdAt) })
  }
}

export const projectMapper = {
  fromApi ({ createdAt, deductions, ...projectDTORest }) {
    return Project({
      ...projectDTORest,
      createdAt: moment(createdAt),
      deductions: deductions?.map(deductionDTO => deductionMapper.fromAPI(deductionDTO))
    })
  },
  toApiCreate ({ name, description, isFirstOrder, propositionalRulesSet }) {
    return { name, description, isFirstOrder, propositionalRulesSet }
  }
}

export const deductionMapper = ({
  fromAPI ({ createdAt, ...deductionDTORest }) {
    return Deduction({ ...deductionDTORest, createdAt: moment(createdAt) })
  }
})
