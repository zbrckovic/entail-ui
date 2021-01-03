import { User } from 'models/user'
import moment from 'moment'

export const userMapper = {
  fromApi: ({ id, email, isEmailVerified, roles, createdAt }) => User({
    id,
    email,
    isEmailVerified,
    roles,
    createdAt: moment(createdAt)
  })
}
