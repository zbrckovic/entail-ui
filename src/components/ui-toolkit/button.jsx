import { css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from 'emotion-theming'
import { darken, lighten, linearGradient, readableColor } from 'polished'
import React, { useMemo } from 'react'
import { Button as BaseButton } from 'rebass'

export const Button = ({ children, icon, variant = 'neutral', ...props }) => {
  const theme = useTheme()

  const style = useMemo(() => {
    const color = theme.colors[variant]
    const colorLighter = lighten(0.06, color)
    const colorDarker = darken(0.06, color)

    return css`
      cursor: pointer;
      white-space: nowrap;
      outline: none;
      color: ${readableColor(color)};
      background: ${color};
      border-radius: 0;
      transition: all 0.1s;
      
      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
      &:active:not(:disabled) {
        background: ${colorDarker};
      }
      &:hover:not(:active):not(:disabled) {
        background: ${colorLighter};
      }
    `
  }, [theme, variant])

  return <BaseButton css={style} {...props}>
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
}
