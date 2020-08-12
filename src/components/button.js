import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { paddingHorizontal, paddingVertical, backgroundWithReadability } from 'style/mixins'
import { getColorForIntent, getMajScale } from 'style/theme'
import styled, { css } from 'styled-components'
import { pipe } from 'utils'

export const Button = ({ children, icon, ...props }) =>
  <StyledButton {...props}>
    {icon && <StyledFontAwesomeIcon icon={icon}/>}
    {
      typeof children === 'string'
        ? children ? <span>{children}</span> : <span>&nbsp;</span>
        : children
    }
  </StyledButton>

const StyledButton = styled.button`
  cursor: pointer;
  white-space: nowrap;
  
  ${pipe(getMajScale(2), paddingHorizontal)};
  ${pipe(getMajScale(1), paddingVertical)};
  
  ${
  pipe(({ intent, theme }) => {
    const backgroundColor = getColorForIntent(intent)({ theme })
    return backgroundWithReadability(backgroundColor)
  })}
  
  ${
  pipe(({ intent, theme }) => {
    return intent === undefined
      ? css`border: 1px solid ${theme.colors.text};`
      : css`border: none;`
  })}
}
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: ${getMajScale(1)};
`
