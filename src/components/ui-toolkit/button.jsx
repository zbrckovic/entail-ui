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
  const { bg, fg, border, minFg } = determineColors(variant, colors)

  return {
    boxSizing: 'border-box',
    px: 2,
    py: 1,
    color: minimal ? minFg : fg,
    bg: minimal ? 'transparent' : bg,
    borderColor: minimal ? 'transparent' : border,
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
      bg: minimal ? 'activeBg' : darken(0.1, bg)
    },
    '&:hover:not(:active):not(:disabled)': {
      bg: minimal ? 'hoverBg' : lighten(0.07, bg)
    }
  }
}

const determineColors = (variant, colors) => {
  switch (variant) {
    case ButtonVariant.NEUTRAL:
      return {
        fg: colors.neutralBtnFg,
        bg: colors.neutralBtnBg,
        border: colors.neutralBtnBorder,
        minFg: colors.neutralMinBtnFg
      }
    case ButtonVariant.PRIMARY:
      return {
        color: colors.primaryBtnFg,
        bg: colors.primaryBtnBg,
        border: colors.primaryBtnBorder,
        minFg: colors.primaryMinBtnFg
      }
    case ButtonVariant.DANGER:
      return {
        color: colors.dangerBtnFg,
        bg: colors.dangerBtnBg,
        border: colors.dangerBtnBorder,
        minFg: colors.dangerMinBtnFg
      }
  }
}
