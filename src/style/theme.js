import { sourceCodeProFamily } from 'style/global-style/fonts/source-code-pro-declaration'
import { sourceSansFamily } from 'style/global-style/fonts/source-sans-pro-declaration'
import { readableColor } from 'polished'

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

const PRIMARY = '#2660a4'
const SECONDARY = '#a74d91'
const SUCCESS = '#3f8a67'
const WARNING = '#fa960a'
const DANGER = '#ec4e20'

const NEUTRAL = '#e5e5e5'

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
  fontWeights: {
    light: 300,
    regular: 400,
    semiBold: 600,
    bold: 700,
    black: 900
  },
  radii: ['0rem', '0.25rem', '0.5rem'],
  colors: {
    primary: PRIMARY,
    secondary: SECONDARY,
    success: SUCCESS,
    warning: WARNING,
    danger: DANGER,
    neutral: NEUTRAL,
    text: neutral[7],
    background: '#f4f4f4',
    border: NEUTRAL,
    shadow: neutral[6],
    formula: PRIMARY,
    term: SECONDARY
  },
  borderWidths: [0, '1px'],
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
  ],
  fontSizes: [
    '0.75rem', '1rem', '1.25rem'
  ]
}
