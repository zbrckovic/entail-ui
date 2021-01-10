export const Project = ({
  id,
  name,
  description,
  isFirstOrder,
  propositionalRulesSet,
  createdAt,
  deductions
}) => ({
  id,
  name,
  description,
  isFirstOrder,
  propositionalRulesSet,
  createdAt,
  deductions
})

export const Deduction = ({
  id,
  name,
  description,
  steps,
  syms,
  presentations,
  theorem,
  createdAt
}) => ({
  id,
  name,
  description,
  steps,
  syms,
  presentations,
  theorem,
  createdAt
})

export const PropositionalRulesSet = {
  FULL: 'FULL',
  TAUTOLOGICAL_IMPLICATION_ONLY: 'TAUTOLOGICAL_IMPLICATION_ONLY',
  SPECIFIC_ONLY: 'SPECIFIC_ONLY'
}
