import { css } from 'styled-components'

export const exampleMixin = css`
  border: ${({ theme: { colors: { border } } }) => border} dashed 1px;
  margin-bottom: ${({ theme: { spaces: { majorScale } } }) => majorScale[1]};
`
