import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { getMajScale } from 'style/theme'
import styled from 'styled-components'

export const Button = ({ children, icon, ...props }) =>
  <StyledButton {...props}>
    {icon && <StyledFontAwesomeIcon icon={icon}/>}
    {children}
  </StyledButton>

const StyledButton = styled.button``

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  &:not(last-child) {
    margin-right: ${({ theme }) => getMajScale(theme, 1)};
  }
`
