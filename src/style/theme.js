import { sourceCodeProFamily } from 'style/global-style/fonts/source-code-pro-declaration'
import { sourceSansFamily } from 'style/global-style/fonts/source-sans-pro-declaration'

const space = [
  0,
  4,
  8,
  12,
  16,
  20,
  24,
  28,
  32
]

const fontSizes = [12, 14, 16, 20]

fontSizes.tiny = fontSizes[0]
fontSizes.small = fontSizes[1]
fontSizes.normal = fontSizes[2]
fontSizes.large = fontSizes[3]

const radii = [0, 4, 8]

const fontWeights = {
  light: 300,
  regular: 400,
  semiBold: 600,
  bold: 700,
  black: 900
}

const neutral = [
  '#fffcfa',
  '#dddbda',
  '#bbbaba',
  '#99999a',
  '#78787a',
  '#56575a',
  '#34363a',
  '#12151a'
]

const colors = {
  primary: '#2660a4',
  secondary: '#a74d91',
  success: '#3f8a67',
  warning: '#fa960a',
  danger: '#ec4e20',
  neutral: '#e5e5e5'
}

Object.assign(colors, {
  text: neutral[7],
  background: '#f4f4f4',
  border: colors.neutral,
  shadow: neutral[6],
  formula: colors.primary,
  term: colors.secondary
})

export const theme = {
  eel: {
    neutral: {
      color: 'text'
    },
    formula: {
      color: 'formula'
    },
    term: {
      color: 'term'
    }
  },
  fonts: {
    main: sourceSansFamily,
    mono: sourceCodeProFamily
  },
  colors,
  fontWeights,
  radii,
  borderWidths: [0, 1],
  space,
  fontSizes
}
