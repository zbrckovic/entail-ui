import { RootCtx } from 'contexts/root-ctx'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import style from './dev-info.module.scss'

/** Shows basic development information. */
export const DevInfo = ({ className }) => {
  const { environment: { apiUrl, version, branch } } = useContext(RootCtx)

  const { t } = useTranslation('DevInfo')

  return (
    <dl className={classNames(className, style.main)}>
      <dt>{t('label.api-url')}</dt>
      <dd>{apiUrl}</dd>
      <dt>{t('label.branch')}</dt>
      <dd>{version}</dd>
      <dt>{t('label.commit')}</dt>
      <dd>{branch}</dd>
    </dl>
  )
}
