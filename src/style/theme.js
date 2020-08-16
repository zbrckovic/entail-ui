import { sourceCodeProFamily } from 'style/global-style/fonts/source-code-pro-declaration'
import { sourceSansFamily } from 'style/global-style/fonts/source-sans-pro-declaration'

const PRIMARY = '#2660a4'
const SECONDARY = '#c45baa'
const SUCCESS = '#49a078'
const WARNING = '#ff990a'
const DANGER = '#ec4e20'

const PRIMARY_DISABLED = '#8fb2da'
const SECONDARY_DISABLED = '#ddb3d2'
const SUCCESS_DISABLED = '#a8cfbd'
const WARNING_DISABLED = '#f3cb93'
const DANGER_DISABLED = '#ecaf9d'

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
    primaryDisabled: PRIMARY_DISABLED,
    onPrimary: 'white',
    onPrimaryDisabled: 'white',

    secondary: SECONDARY,
    secondaryDisabled: SECONDARY_DISABLED,
    onSecondary: 'white',
    onSecondaryDisabled: 'white',

    success: SUCCESS,
    successDisabled: SUCCESS_DISABLED,
    onSuccess: 'white',
    onSuccessDisabled: 'white',

    warning: WARNING,
    warningDisabled: WARNING_DISABLED,
    onWarning: 'white',
    onWarningDisabled: 'white',

    danger: DANGER,
    dangerDisabled: DANGER_DISABLED,
    onDanger: 'white',
    onDangerDisabled: 'white',

    neutral: neutral[2],
    onNeutral: neutral[7],
    neutralDisabled: neutral[1],
    onNeutralDisabled: 'white',

    text: neutral[7],
    textDisabled: neutral[3],

    background: neutral[0],
    border: neutral[4],
    formula: PRIMARY,
    term: SECONDARY
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
