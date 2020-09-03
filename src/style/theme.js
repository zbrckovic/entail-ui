import { saturate, lighten, tint, darken } from 'polished'
import { sourceCodeProFamily } from 'style/global-style/fonts/source-code-pro-declaration'
import { sourceSansFamily } from 'style/global-style/fonts/source-sans-pro-declaration'

const primary = '#2f6499'
const success = '#009999'
const danger = '#992323'
const neutral = '#8a9199'

const neutralBtnBg = neutral
const neutralBtnFg = 'black'
const neutralBtnBorder = darken(0.05, neutral)
const neutralMinBtnFg = neutral

const primaryBtnBg = primary
const primaryBtnFg = 'white'
const primaryBtnBorder = darken(0.05, primary)
const primaryMinBtnFg = primary

const successBtnBg = success
const successBtnFg = 'white'
const successBtnBorder = darken(0.05, success)
const successMinBtnFg = success

const dangerBtnBg = danger
const dangerBtnFg = 'white'
const dangerBtnBorder = darken(0.05, danger)
const dangerMinBtnFg = danger

const planeBg = tint(0.6, neutral)
const planeFg = 'black'
const planeBorder = neutral

const inputBg = tint(0.9, neutral)
const inputFg = 'black'
const inputBorder = neutral

const outline = saturate(0.2, lighten(0.5, primary))

const formula = primary
const term = lighten(0.2, primary)

const colors = {
  neutralBtnBg,
  neutralBtnFg,
  neutralBtnBorder,
  neutralMinBtnFg,

  primaryBtnBg,
  primaryBtnFg,
  primaryBtnBorder,
  primaryMinBtnFg,

  successBtnBg,
  successBtnFg,
  successBtnBorder,
  successMinBtnFg,

  dangerBtnBg,
  dangerBtnFg,
  dangerBtnBorder,
  dangerMinBtnFg,

  planeBg,
  planeFg,
  planeBorder,

  inputBg,
  inputFg,
  inputBorder,

  outline,

  formula,
  term
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
