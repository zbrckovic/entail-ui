import { useTranslation } from 'react-i18next'
import { PropositionalRulesSet } from 'models/project'

export const usePropositionalRulesSetDescriber = () => {
  const { t } = useTranslation()

  return {
    describe (propositionalRulesSet) {
      switch (propositionalRulesSet) {
        case PropositionalRulesSet.FULL: {
          return t('projectsPage.propositionalRulesSetDescription.allLbl')
        }
        case PropositionalRulesSet.TAUTOLOGICAL_IMPLICATION_ONLY: {
          return t(
            'projectsPage.propositionalRulesSetDescription.tautologicalImplicationOnlyLbl'
          )
        }
        case PropositionalRulesSet.SPECIFIC_ONLY: {
          return t('projectsPage.propositionalRulesSetDescription.specificRulesOnlyLbl')
        }
      }
    }
  }
}
