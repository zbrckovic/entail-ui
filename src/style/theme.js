import { Kind } from '@zbrckovic/entail-core/lib/abstract-structures/sym/kind'
import { sourceCodeProFamily } from 'style/global-style/fonts/source-code-pro-declaration'
import { sourceSansFamily } from 'style/global-style/fonts/source-sans-pro-declaration'
import { css } from 'styled-components'

export const theme = {
  fonts: {
    family: sourceSansFamily,
    monoFamily: sourceCodeProFamily
  },
  colors: {
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

export const getMajScale = (theme, i) => theme.spaces.majorScale[i]
export const getMinScale = (theme, i) => theme.spaces.minorScale[i]

export const getColorForKind = ({ colors: { formula, term } }, kind) => {
  switch (kind) {
    case Kind.Formula:
      return formula
    case Kind.Term:
      return term
  }
}
