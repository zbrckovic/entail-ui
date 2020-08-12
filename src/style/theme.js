import { Kind } from '@zbrckovic/entail-core/lib/abstract-structures/sym/kind'
import { Intent } from 'components/intent'
import { sourceCodeProFamily } from 'style/global-style/fonts/source-code-pro-declaration'
import { sourceSansFamily } from 'style/global-style/fonts/source-sans-pro-declaration'
import { curry } from 'utils'

export const theme = {
  fonts: {
    family: sourceSansFamily,
    monoFamily: sourceCodeProFamily
  },
  colors: {
    primary: 'blue',
    success: 'green',
    warning: 'yellow',
    danger: 'red',
    neutral: 'white',
    text: '#000000',
    background: '#FFFEF6',
    border: '#5c7080',
    formula: '#A7B6C2',
    term: '#EB532D'
  },
  spaces: {
    // hints are made under assumption: 1rem = 16px
    majorScale: [
      '0rem', //    0 -> 0px
      '0.5rem', //  1 -> 8px
      '1rem', //    2 -> 16px
      '1.5rem', //  3 -> 24px
      '2rem' //     4 -> 32px
    ],
    minorScale: [
      '0rem', //    0 -> 0px
      '0.25rem', // 1 -> 4px
      '0.75rem', // 3 -> 12px
      '1.25rem', // 4 -> 20px
      '1.75rem' //  5 -> 28px
    ]
  }
}

export const getMajScale = curry((i, { theme }) => theme.spaces.majorScale[i])
export const getMinScale = curry((i, { theme }) => theme.spaces.minorScale[i])
export const getColorForKind = curry((kind, { theme }) => {
  const { colors: { formula, term } } = theme

  switch (kind) {
    case Kind.Formula:
      return formula
    case Kind.Term:
      return term
  }
})

export const getColorForIntent = curry((intent, { theme }) => {
  const { colors: { primary, success, warning, danger, neutral } } = theme
  switch (intent) {
    case Intent.PRIMARY:
      return primary
    case Intent.SUCCESS:
      return success
    case Intent.WARNING:
      return warning
    case Intent.DANGER:
      return danger
    default:
      return neutral
  }
})
