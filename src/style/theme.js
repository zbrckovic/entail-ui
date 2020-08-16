import { sourceCodeProFamily } from 'style/global-style/fonts/source-code-pro-declaration'
import { sourceSansFamily } from 'style/global-style/fonts/source-sans-pro-declaration'

const palette = {
  lapisLazuli: '#2660a4',
  mulberryCrayola: '#c45baa',
  flame: '#ec4e20',
  yellowOrange: '#ff990a',
  shinyShamrock: '#49a078'
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
  buttons: {
    neutral: {
      color: 'text',
      bg: neutral[1]
    },
    primary: {
      color: 'onPrimary',
      bg: 'primary'
    },
    success: {
      color: 'onSuccess',
      bg: 'success'
    },
    warning: {
      color: 'onWarning',
      bg: 'warning'
    },
    danger: {
      color: 'onDanger',
      bg: 'danger'
    }
  },
  fonts: {
    main: sourceSansFamily,
    mono: sourceCodeProFamily
  },
  colors: {
    primary: palette.lapisLazuli,
    onPrimary: 'white',
    success: palette.shinyShamrock,
    onSuccess: 'white',
    warning: palette.yellowOrange,
    onWarning: 'white',
    danger: palette.flame,
    onDanger: 'white',
    text: neutral[7],
    background: neutral[0],
    border: neutral[4],
    formula: palette.lapisLazuli,
    term: palette.mulberryCrayola
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
