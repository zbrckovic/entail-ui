import { RootCtx } from 'contexts'
import React, { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import style from './dev-info.m.scss'

export const DevInfo = ({ className, ...props }) => {
  const { environment } = useContext(RootCtx)
  const { t } = useTranslation('DevInfo')

  const entries = useMemo(() => {
    const { apiUrl, version, branch } = environment

    return [
      [t('label.apiUrl'), apiUrl],
      [t('label.branch'), version],
      [t('label.commit'), branch]
    ]
  }, [t, environment])

  return (
    <dl className={className} {...props}>
      {entries.map(([label, value], i) => (
        <div className={style.row} key={i}>
          <dt><strong>{label}</strong></dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}
