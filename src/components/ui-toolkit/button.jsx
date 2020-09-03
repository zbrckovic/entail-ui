import { css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from 'emotion-theming'
import { darken, lighten } from 'polished'
import React, { useMemo } from 'react'
import { Button as BaseButton } from 'rebass'

export const Button = ({ children, icon, variant = ButtonVariant.NEUTRAL, minimal, ...props }) => {
  const theme = useTheme()

  const style = useMemo(() => {
    return createStyle(theme, variant, minimal)
  }, [theme, variant, minimal])

  return (
    <BaseButton sx={style} {...props}>
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

const createStyle = ({ colors }, variant, minimal) => {
  const { color, backgroundColor, borderColor } = determineColors(variant, colors)

  return {
    px: 2,
    py: 1,
    color: minimal ? backgroundColor : color,
    bg: minimal ? 'transparent' : backgroundColor,
    borderColor: minimal ? 'transparent' : borderColor,
    borderWidth: minimal ? undefined : 1,
    borderStyle: minimal ? undefined : 'solid',
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
      bg: darken(0.1, backgroundColor)
    },
    '&:hover:not(:active):not(:disabled)': {
      bg: lighten(0.07, backgroundColor)
    }
  }
}

const determineColors = (variant, colors) => {
  switch (variant) {
    case ButtonVariant.NEUTRAL:
      return {
        color: colors.onNeutral,
        backgroundColor: colors.neutral,
        borderColor: colors.neutralBorder
      }
    case ButtonVariant.PRIMARY:
      return {
        color: colors.onPrimary,
        backgroundColor: colors.primary,
        borderColor: colors.primaryBorder
      }
    case ButtonVariant.DANGER:
      return {
        color: colors.onDanger,
        backgroundColor: colors.danger,
        borderColor: colors.dangerBorder
      }
  }
}
