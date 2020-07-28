import { RootCtx } from 'contexts'
import { useContext } from 'react'
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
  const { t } = useTranslation('ParserErrorDescriber')
  return ({ location: { start } }) => {
    return t('syntax-error', { location: start })
  }
}
