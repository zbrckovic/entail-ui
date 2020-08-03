import { Rule } from '@zbrckovic/entail-core/lib/deduction-structure/rule'
import { RootCtx } from 'contexts'
import { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Returns an object to be used with `classNames`. It will include `darkClass` key depending on
 * whether dark theme is active. If `lightClass` is specified it will also include `lightClass` key
 * if light time is active.
 */
export const useThemeClasses = (darkClass = 'dark', lightClass) => {
  const { themeDark } = useContext(RootCtx)

  const result = { [darkClass]: themeDark }
  if (lightClass !== undefined) result[lightClass] = !themeDark

  return result
}

export const useParserErrorDescriber = () => {
  const { t } = useTranslation('ParserError')
  return ({ location: { start } }) => {
    return t('syntax-error', { location: start })
  }
}

export const useRuleDescriber = () => {
  const { t } = useTranslation('Rule')

  return useCallback(rule => {
    switch (rule) {
      case Rule.Premise:
        return {
          translation: t('premise'),
          abbreviation: t('premise-abbreviated')
        }
      case Rule.TautologicalImplication:
        return {
          translation: t('tautological-implication'),
          abbreviation: t('tautological-implication-abbreviated')
        }
      case Rule.Deduction:
        return {
          translation: t('deduction'),
          abbreviation: t('deduction-abbreviated')
        }
      case Rule.Theorem:
        return {
          translation: t('theorem'),
          abbreviation: t('theorem-abbreviated')
        }
      case Rule.UniversalInstantiation:
        return {
          translation: t('universal-instantiation'),
          abbreviation: t('universal-instantiation-abbreviated')
        }
      case Rule.UniversalGeneralization:
        return {
          translation: t('universal-generalization'),
          abbreviation: t('universal-generalization-abbreviated')
        }
      case Rule.ExistentialInstantiation:
        return {
          translation: t('existential-instantiation'),
          abbreviation: t('existential-instantiation-abbreviated')
        }
      case Rule.ExistentialGeneralization:
        return {
          translation: t('existential-generalization'),
          abbreviation: t('existential-generalization-abbreviated')
        }
    }
  }, [t])
}
