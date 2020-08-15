import { Kind } from '@zbrckovic/entail-core/lib/abstract-structures/sym/kind'
import { sourceCodeProFamily } from 'style/global-style/fonts/source-code-pro-declaration'
import { sourceSansFamily } from 'style/global-style/fonts/source-sans-pro-declaration'
import { curry } from 'utils'

export const theme = {
  eel: {
    normal: {
      color: 'text'
    },
    formula: {
      color: 'formula'
    },
    term: {
      color: 'term'
    }
  },
  buttons: {
    normal: {
      color: 'text',
      bg: 'neutral'
    },
    primary: {
      color: 'white',
      bg: 'primary'
    },
    danger: {
      color: 'white',
      bg: 'danger'
    }
  },
  fonts: {
    main: sourceSansFamily,
    mono: sourceCodeProFamily
  },
  colors: {
    primary: 'blue',
    neutral: 'white',
    success: 'green',
    warning: 'yellow',
    danger: 'red',
    text: '#000000',
    background: '#FFFEF6',
    border: '#5c7080',
    formula: '#A7B6C2',
    term: '#EB532D'
  },
  space: [
    '0rem', // 0 -> 0px
    '0.25rem', // 1 -> 4px
    '0.5rem', // 2 -> 8px
    '0.75rem', // 3 -> 12px
    '1rem', // 4 -> 16px
    '1.25rem', // 5 -> 20px
    '1.5rem', // 6 -> 24px
    '1.75rem', // 7 -> 28px
    '2rem' // 8 -> 32px
  ]
}

export const getColorForKind = curry((kind, { theme }) => {
  const { colors: { formula, term } } = theme

  switch (kind) {
    case Kind.Formula:
      return formula
    case Kind.Term:
      return term
  }
})
