import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'
import { space, variant } from 'styled-system'

export const Button = ({ children, icon, ...props }) =>
  <StyledButton {...props}>
    {icon && <StyledFontAwesomeIcon icon={icon} mr={4}/>}
    {
      typeof children === 'string'
        ? children ? <span>{children}</span> : <span>&nbsp;</span>
        : children
    }
  </StyledButton>

const StyledButton = styled('button')(
  {
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  variant({
    variants: {
      primary: {
        color: 'white',
        bg: 'primary'
      }
    }
  })
)

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)(space)
