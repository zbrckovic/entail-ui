import { RootCtx } from 'contexts/root-ctx'
import React, { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

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
    <StyledDl className={className}>
      {entries.map(([label, value], i) => (
        <StyledRow key={i}>
          <StyledDt>{label}</StyledDt>
          <StyledDd>{value}</StyledDd>
        </StyledRow>
      ))}
    </StyledDl>
  )
}

const StyledDl = styled.dl`
  margin: 0;
`

const StyledRow = styled.div`
  display: flex;
`

const StyledDt = styled.dt`
  flex-grow: 0;
  width: 100px;
  font-weight: bold;
`

const StyledDd = styled.dd`
  flex-grow: 1;
  margin-left: 0;
`
