import { Icon, Switch, Tooltip } from '@blueprintjs/core'
import { TOOLTIP_OPEN_DELAY_MS } from 'app-constants'
import classNames from 'classnames'
import { RootCtx } from 'contexts'
import { useThemeClasses } from 'hooks'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import style from './theme-switch.module.scss'

/** Control for changing the visual theme of the application (switches between dark and light). */
export const ThemeSwitch = () => {
  const { t } = useTranslation('ThemeSwitch')

  const { themeDark, setThemeDark } = useContext(RootCtx)

  const switchTheme = () => { setThemeDark(!themeDark) }

  const themeClasses = useThemeClasses(style.dark, style.light)

  return (
    <Tooltip content={t('tooltip.switch-theme')} hoverOpenDelay={TOOLTIP_OPEN_DELAY_MS}>
      <div className={classNames(style.container, themeClasses)}>
        <Switch
          className={style.switch}
          checked={themeDark}
          onChange={switchTheme}
        />
        <Icon
          className={style.icon}
          icon={themeDark ? 'moon' : 'flash'}
          onClick={switchTheme}
        />
      </div>
    </Tooltip>
  )
}
