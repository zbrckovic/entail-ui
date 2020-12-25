export const createError = (name, message = '', extra = undefined) => {
  const error = new Error(message)
  error.name = name
  error.message = `${name}: ${message}`
  error.extra = extra
  return error
}

export const ErrorName = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',

  EMAIL_ALREADY_USED: 'EMAIL_ALREADY_USED',
  EMAIL_ALREADY_VERIFIED: 'EMAIL_ALREADY_VERIFIED',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',

  NO_TOKEN: 'NO_TOKEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',

  UNAUTHORIZED: 'UNAUTHORIZED'
}
