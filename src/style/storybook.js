import { css } from 'styled-components'

export const exampleMixin = css`
  border: ${({ theme: { color: { border } } }) => border} dashed 1px;
  margin-bottom: ${({ theme: { space: { majorScale } } }) => majorScale[1]};
`
