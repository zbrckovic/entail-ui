import { padding, readableColor } from 'polished'
import { css } from 'styled-components'

export const spaceBetweenHorizontal = space => css`
  & > *:not(:last-child) {
    margin-right: ${space};
  }
`

export const spaceBetweenVertical = space => css`
  &>*:not(:last-child) {
    margin-bottom: ${space};
  }
`

export const backgroundWithReadability = backgroundColor => css`
  background: ${backgroundColor};
  color: ${readableColor(backgroundColor)};
`

export const paddingHorizontal = space => css`${padding(null, space, null, space)}`
export const paddingVertical = space => css`${padding(space, null, space, null)}`
