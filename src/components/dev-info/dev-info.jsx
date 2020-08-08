import { RootCtx } from 'contexts/root-ctx'
import { Box, Text } from 'grommet'
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
  }, [environment])

  return (
    <Box as="dl" className={className}>
      {entries.map(([label, value], i) => (
        <Box key={i} direction="row">
          <Box
            as="dt"
            width="xsmall"
            flex={{ grow: 0, shrink: 0 }}>
            <Text as="label" weight="bold" size="small">
              {label}
            </Text>
          </Box>
          <Box
            as="dd"
            flex={{ grow: 1, shrink: 0 }}
            margin="none">
            <Text size="small">
              {value}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
