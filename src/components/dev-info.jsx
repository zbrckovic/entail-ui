import { RootCtx } from 'contexts'
import React, { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Flex } from 'rebass'

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
    <Box as='dl' margin={0} {...props}>
      {entries.map(([label, value], i) => (
        <Flex key={i}>
          <Box
            as='dt'
            flexGrow={0}
            width={'100px'}
            fontWeight='bold'
          >
            {label}
          </Box>
          <Box
            as='dd'
            flexGrow={1}
            marginLeft={0}
          >
            {value}
          </Box>
        </Flex>
      ))}
    </Box>
  )
}
