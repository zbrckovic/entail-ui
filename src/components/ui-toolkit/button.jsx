import { css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button as BaseButton } from 'rebass'

export const Button = ({ children, icon, ...props }) =>
  <BaseButton
    variant='normal'
    css={css`
      cursor: pointer;
      white-space: nowrap;
    `}
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
  </BaseButton>
