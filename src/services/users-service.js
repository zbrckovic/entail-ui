import { userMapper } from 'mappers'
import { map } from 'rxjs/operators'

export const UsersService = ({ apiService }) => ({
  getUsers ({ pageNumber, pageSize, orderProp, orderDir }) {
    return apiService
      .getUsers({ pageNumber, pageSize, orderProp, orderDir })
      .pipe(
        map(({ total, items }) => ({
          total,
          items: items.map(userDTO => userMapper.fromApi(userDTO))
        }))
      )
  }
})
