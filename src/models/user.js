export const User = ({ email, isEmailVerified, roles }) => ({
  email,
  getUsername () {
    return this.email.match(usernamePattern)[1]
  },
  isAdmin () {
    return this.roles.some(role => role === Role.ADMIN || role === Role.SUPER_ADMIN)
  },
  isEmailVerified,
  roles
})

export const Role = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  REGULAR: 'REGULAR'
}

const usernamePattern = /^(.*)@/
