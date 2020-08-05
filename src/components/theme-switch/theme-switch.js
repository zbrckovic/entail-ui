import classNames from 'classnames'
import { RootCtx } from 'contexts'
import React, { useContext } from 'react'
import style from './theme-switch.module.scss'

/** Control for changing the visual theme of the application (switches between dark and light). */
export const ThemeSwitch = ({ className }) => {
  const { themeDark, setThemeDark } = useContext(RootCtx)

  const switchTheme = () => { setThemeDark(!themeDark) }

  return (
    <div className={classNames(className, style.container)}>
      <input
        type="checkbox"
        checked={themeDark}
        className={style.switch}
        onChange={switchTheme}
      />
    </div>
  )
}
