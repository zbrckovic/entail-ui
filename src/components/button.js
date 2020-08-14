import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'
import { space, variant } from 'styled-system'

export const Button = ({ children, icon, appearance = 'normal', ...props }) =>
  <StyledButton {...{ appearance, ...props }}>
    {icon && <StyledFontAwesomeIcon icon={icon} mr={children ? 4 : undefined}/>}
    {
      typeof children === 'string'
        ? (children ? <span>{children}</span> : <span>&#8203;</span>)
        : children
    }
  </StyledButton>

const StyledButton = styled('button')(
  {
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  variant({
    prop: 'appearance',
    variants: {
      normal: {
        color: 'text',
        bg: 'neutral'
      },
      primary: {
        color: 'white',
        bg: 'primary'
      },
      danger: {
        color: 'white',
        bg: 'danger'
      }
    }
  })
)

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)(space)
