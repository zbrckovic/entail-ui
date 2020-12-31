import { User } from 'models/user'

export const userMapper = {
  fromApi: rawUser => User(rawUser)
}
