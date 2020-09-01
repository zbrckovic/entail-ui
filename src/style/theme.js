import { saturate, desaturate, lighten, tint } from 'polished'
import { sourceCodeProFamily } from 'style/global-style/fonts/source-code-pro-declaration'
import { sourceSansFamily } from 'style/global-style/fonts/source-sans-pro-declaration'

const primary = '#285480'
const onPrimary = 'white'
const secondary = '#00a9a5'
const onSecondary = 'white'
const success = secondary
const onSuccess = 'white'
const danger = '#fb3640'
const onDanger = 'white'
const neutral = tint(0.8, desaturate(0.3, primary))
const onNeutral = 'black'

// background color which usually doesn't contain any readable content
const background = tint(0.3, primary)
const onBackground = 'black'

// primary background color for readable content
const surface = tint(0.95, neutral)
const onSurface = 'black'

// alternative background for readable content
const surfaceAlt = tint(0.6, neutral)
const onSurfaceAlt = 'black'

const inputSurface = tint(0.9, neutral)
const onInputSurface = 'black'

const formula = primary
const term = lighten(0.2, primary)

const outline = saturate(0.2, lighten(0.5, primary))

const colors = {
  primary,
  onPrimary,
  secondary,
  onSecondary,
  success,
  onSuccess,
  danger,
  onDanger,
  neutral,
  onNeutral,
  background,
  onBackground,
  surface,
  onSurface,
  surfaceAlt,
  onSurfaceAlt,
  inputSurface,
  onInputSurface,
  formula,
  term,
  outline
}

const space = [0, 4, 8, 12, 16, 20, 24, 28, 32]

const fontSizes = [10, 12, 14, 16]
fontSizes.tiny = fontSizes[0]
fontSizes.small = fontSizes[1]
fontSizes.normal = fontSizes[2]
fontSizes.large = fontSizes[3]

const radii = [0, 2, 4]

const fontWeights = {
  light: 300,
  regular: 400,
  semiBold: 600,
  bold: 700,
  black: 900
}

const breakpoints = ['568px', '768px', '1200px']

const mediaQueries = {
  phoneLandscape: `@media screen and (min-width: ${breakpoints[0]})`,
  tablet: `@media screen and (min-width: ${breakpoints[1]})`,
  desktop: `@media screen and (min-width: ${breakpoints[2]})`
}

export const theme = {
  fonts: {
    main: sourceSansFamily,
    mono: sourceCodeProFamily
  },
  fontWeights,
  radii,
  colors,
  borderWidths: [0, 1],
  space,
  fontSizes,
  breakpoints,
  mediaQueries
}
