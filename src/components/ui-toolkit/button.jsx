import { css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button as BaseButton } from 'rebass'

export const Button = ({ children, icon, variant = 'neutral', ...props }) =>
  <BaseButton
    sx={variantStyles[variant]}
    css={css`
      cursor: pointer;
      white-space: nowrap;
    `}
    {...props}
  >
    {icon &&
    <FontAwesomeIcon
      css={theme => css({ marginRight: children ? theme.space[2] : undefined })}
      icon={icon}
    />}
    {
      typeof children === 'string'
        ? (children ? <span>{children}</span> : <span>&#8203;</span>)
        : children
    }
  </BaseButton>

const variantStyles = {
  neutral: {
    color: 'onNeutral',
    bg: 'neutral',
    '&[disabled]': {
      color: 'onNeutralDisabled',
      bg: 'neutralDisabled',
      cursor: 'not-allowed'
    }
  },
  primary: {
    color: 'onPrimary',
    bg: 'primary',
    '&[disabled]': {
      color: 'onPrimaryDisabled',
      bg: 'primaryDisabled',
      cursor: 'not-allowed'
    }
  },
  secondary: {
    color: 'onSecondary',
    bg: 'secondary',
    '&[disabled]': {
      color: 'onSecondaryDisabled',
      bg: 'secondaryDisabled',
      cursor: 'not-allowed'
    }
  },
  success: {
    color: 'onSuccess',
    bg: 'success',
    '&[disabled]': {
      color: 'onSuccessDisabled',
      bg: 'successDisabled',
      cursor: 'not-allowed'
    }
  },
  warning: {
    color: 'onWarning',
    bg: 'warning',
    '&[disabled]': {
      color: 'onWarningDisabled',
      bg: 'warningDisabled',
      cursor: 'not-allowed'
    }
  },
  danger: {
    color: 'onDanger',
    bg: 'danger',
    '&[disabled]': {
      color: 'onDangerDisabled',
      bg: 'dangerDisabled',
      cursor: 'not-allowed'
    }
  }
}
