import { css } from '@emotion/core'

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
