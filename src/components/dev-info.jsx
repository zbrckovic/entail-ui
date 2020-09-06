import Box from '@material-ui/core/Box'
import { RootCtx } from 'contexts'
import React, { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export const DevInfo = ({ ...props }) => {
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
    <Box component='dl' {...props}>
      {entries.map(([label, value], i) => (
        <Box display='flex' key={i}>
          <Box component='dt' flexGrow={0} width={'100px'} fontWeight='bold'>
            {label}
          </Box>
          <Box component='dd' flexGrow={1} marginLeft={0}>
            {value}
          </Box>
        </Box>
      ))}
    </Box>
  )
}
