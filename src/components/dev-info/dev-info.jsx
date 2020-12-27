import { RootCtx } from 'contexts'
import React, { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import style from './dev-info.m.scss'

export const DevInfo = ({ className, ...props }) => {
  const { environment } = useContext(RootCtx)
  const { t } = useTranslation()

  const entries = useMemo(() => {
    const { apiUrl, version, branch } = environment

    return [
      [t('devInfo.apiUrlLbl'), apiUrl],
      [t('devInfo.branchLbl'), version],
      [t('devInfo.commitLbl'), branch]
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
