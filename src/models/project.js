export const Project = ({
  id,
  name,
  description,
  isFirstOrder,
  propositionalRulesSet,
  createdAt
}) => ({
  id,
  name,
  description,
  isFirstOrder,
  propositionalRulesSet,
  createdAt
})

export const PropositionalRulesSet = {
  FULL: 'FULL',
  TAUTOLOGICAL_IMPLICATION_ONLY: 'TAUTOLOGICAL_IMPLICATION_ONLY',
  SPECIFIC_ONLY: 'SPECIFIC_ONLY'
}
