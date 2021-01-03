export const User = ({ id, email, isEmailVerified, roles, createdAt }) => ({
  id,
  email,
  getUsername () {
    return this.email.match(usernamePattern)[1]
  },
  isAdmin () {
    return this.roles.some(role => role === Role.ADMIN || role === Role.SUPER_ADMIN)
  },
  isEmailVerified,
  roles,
  createdAt
})

export const Role = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  REGULAR: 'REGULAR'
}

const usernamePattern = /^(.*)@/
