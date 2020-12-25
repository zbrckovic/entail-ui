import validator from 'validator'

export const PASSWORD_STRENGTH_THRESHOLD_WEAK = 0.4
export const PASSWORD_STRENGTH_THRESHOLD_STRONG = 0.8

export const isSufficientlyStrongPassword = value =>
  calculatePasswordStrength(value) >= PASSWORD_STRENGTH_THRESHOLD_WEAK

export const calculatePasswordStrength = value => Math.min(
  validator.isStrongPassword(value, { returnScore: true }) / 60,
  1
)
