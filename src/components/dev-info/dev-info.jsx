import { RootCtx } from 'contexts/root-ctx'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import style from './dev-info.module.scss'

export const DevInfo = () => {
  const { environment: { apiUrl, version, branch } } = useContext(RootCtx)

  const { t } = useTranslation('DevInfo')

  return (
    <dl className={style.main}>
      <dt>{t('label.api-url')}</dt>
      <dd>{apiUrl}</dd>
      <dt>{t('label.branch')}</dt>
      <dd>{version}</dd>
      <dt>{t('label.commit')}</dt>
      <dd>{branch}</dd>
    </dl>
  )
}
