import { RootCtx } from 'contexts/root-ctx'
import React, { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

/** Shows basic development information. */
export const DevInfo = ({ className }) => {
  const { environment } = useContext(RootCtx)
  const { t } = useTranslation('DevInfo')

  const entries = useMemo(() => {
    const { apiUrl, version, branch } = environment

    return [
      [t('label.api-url'), apiUrl],
      [t('label.branch'), version],
      [t('label.commit'), branch]
    ]
  }, [t, environment])

  return (
    <dl
      className={className}
      css={{ margin: 0 }}
    >
      {entries.map(([label, value], i) => (
        <div key={i} css={{ display: 'flex' }}>
          <dt
            css={{ flexGrow: 0, width: '100px', fontWeight: 'bold' }}
          >{label}</dt>
          <dd css={{ flexGrow: 1, marginLeft: 0 }}>{value}</dd>
        </div>
      ))}
    </dl>
  )
}
