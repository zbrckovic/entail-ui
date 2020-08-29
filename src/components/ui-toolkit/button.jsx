import { css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from 'emotion-theming'
import { darken, lighten } from 'polished'
import React, { useMemo } from 'react'
import { Button as BaseButton } from 'rebass'

export const Button = ({ children, icon, variant = ButtonVariant.NEUTRAL, ...props }) => {
  const { colors } = useTheme()

  const { color, bg, bgHovered, bgPressed, border } = useMemo(() => {
    const { color, bg } = determineColors(variant, colors)

    return {
      color,
      bg,
      bgHovered: lighten(0.07, bg),
      bgPressed: darken(0.1, bg),
      border: darken(0.2, bg)
    }
  }, [variant, colors])

  return (
    <BaseButton
      sx={{
        px: 2,
        py: 1,
        color,
        bg,
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
          bg: bgPressed
        },
        '&:hover:not(:active):not(:disabled)': {
          bg: bgHovered
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

export const ButtonVariant = {
  NEUTRAL: 'NEUTRAL',
  PRIMARY: 'PRIMARY',
  DANGER: 'DANGER'
}

const determineColors = (variant, colors) => {
  switch (variant) {
    case ButtonVariant.NEUTRAL:
      return {
        color: colors.onNeutral,
        bg: colors.neutral
      }
    case ButtonVariant.PRIMARY:
      return {
        color: colors.onPrimary,
        bg: colors.primary
      }
    case ButtonVariant.DANGER:
      return {
        color: colors.onDanger,
        bg: colors.danger
      }
  }
}
