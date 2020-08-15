import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button as RButton } from 'rebass'
import { css } from '@emotion/core'

export const Button = ({ children, icon, ...props }) =>
  <RButton
    variant='normal'
    sx={{
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    }}
    {...props}
  >
    {icon &&
    <FontAwesomeIcon
      css={css({ marginRight: children ? 4 : undefined })}
      icon={icon}
    />}
    {
      typeof children === 'string'
        ? (children ? <span>{children}</span> : <span>&#8203;</span>)
        : children
    }
  </RButton>
