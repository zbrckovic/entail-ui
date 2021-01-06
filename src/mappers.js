import { User } from 'models/user'
import moment from 'moment'
import { Project } from './models/project'

export const userMapper = {
  fromApi ({ id, email, isEmailVerified, roles, createdAt }) {
    return User({
      id,
      email,
      isEmailVerified,
      roles,
      createdAt: moment(createdAt)
    })
  }
}

export const projectMapper = {
  fromApi ({ id, name, description, isFirstOrder, propositionalRulesSet, createdAt }) {
    return Project({
      id,
      name,
      description,
      isFirstOrder,
      propositionalRulesSet,
      createdAt: moment(createdAt)
    })
  },
  toApi ({ id, name, description, isFirstOrder, propositionalRulesSet }) {
    return { id, name, description, isFirstOrder, propositionalRulesSet }
  }
}
