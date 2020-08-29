import { css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useMemo } from 'react'
import { Button as BaseButton } from 'rebass'

export const Button = ({ children, icon, variant = ButtonVariants.NEUTRAL, ...props }) => {
  const {
    color,
    background,
    backgroundHighlighted,
    backgroundPressed,
    border
  } = variantData[variant]

  return (
    <BaseButton
      sx={{
        px: 2,
        py: 1,
        color,
        bg: background,
        borderColor: border,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 1,
        outlineColor: 'outline',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all 0.1s',
        '&:disabled': {
          cursor: 'not-allowed',
          opacity: 0.5
        },
        '&:active:not(:disabled)': {
          bg: backgroundPressed
        },
        '&:hover:not(:active):not(:disabled)': {
          bg: backgroundHighlighted
        }
      }}
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
  )
}

export const ButtonVariants = {
  NEUTRAL: 'NEUTRAL',
  PRIMARY: 'PRIMARY',
  DANGER: 'DANGER'
}

const variantData = {
  [ButtonVariants.NEUTRAL]: {
    color: 'onNeutralWidget',
    background: 'neutralWidget',
    backgroundHighlighted: 'neutralWidgetHighlighted',
    backgroundPressed: 'neutralWidgetPressed',
    border: 'neutralWidgetBorder'
  },
  [ButtonVariants.PRIMARY]: {
    onPrimary: 'onPrimaryWidget',
    background: 'primaryWidget',
    backgroundHighlighted: 'primaryWidgetHighlighted',
    backgroundPressed: 'primaryWidgetPressed',
    border: 'primaryWidgetBorder'
  },
  [ButtonVariants.DANGER]: {
    onDanger: 'onDangerWidget',
    background: 'dangerWidget',
    backgroundHighlighted: 'dangerWidgetHighlighted',
    backgroundPressed: 'dangerWidgetPressed',
    border: 'dangerWidgetBorder'
  }
}
