import { Kind } from '@zbrckovic/entail-core/lib/abstract-structures/sym/kind'
import { sourceCodeProFamily } from 'style/global-style/fonts/source-code-pro-declaration'
import { sourceSansFamily } from 'style/global-style/fonts/source-sans-pro-declaration'

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
    majorScale: ['0rem', '0.5rem', '1rem', '1.5rem', '2rem'],
    minorScale: ['0rem', '0.25rem', '0.75rem', '1.25rem', '1.75rem']
  }
}

export const getColorForKind = ({ colors: { formula, term } }, kind) => {
  switch (kind) {
    case Kind.Formula:
      return formula
    case Kind.Term:
      return term
  }
}
