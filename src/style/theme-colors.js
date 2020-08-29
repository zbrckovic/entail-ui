const neutrals = [
  '#000000',
  '#0e1010',
  '#1d201f',
  '#2b2f2f',
  '#3a3f3f',
  '#494f4f',
  '#575f5e',
  '#666f6e',
  '#747e7e',
  '#838e8d',
  '#9ca8a7',
  '#a7b1b1',
  '#b2bbba',
  '#bdc5c4',
  '#c8cfce',
  '#d3d8d8',
  '#dee2e2',
  '#e9eceb',
  '#f4f5f5',
  '#ffffff'
]

const primaries = [
  '#000000',
  '#041514',
  '#092929',
  '#0d3e3d',
  '#125351',
  '#176866',
  '#1b7c7a',
  '#1f918e',
  '#24a6a2',
  '#29bab7',
  '#2dcfcb',
  '#42d4d0',
  '#57d9d5',
  '#6cdddb',
  '#81e2e0',
  '#96e7e5',
  '#abecea',
  '#c0f1ef',
  '#d5f5f5',
  '#eafafa',
  '#ffffff'
]

const secondaries = [
  '#000000',
  '#140a08',
  '#29140f',
  '#3d1d17',
  '#52271e',
  '#663126',
  '#7a3b2e',
  '#8f4535',
  '#a34e3d',
  '#b85844',
  '#cc624c',
  '#d1725e',
  '#d68170',
  '#db9182',
  '#e0a194',
  '#e6b1a6',
  '#ebc0b7',
  '#f0d0c9',
  '#f5e0db',
  '#faefed',
  '#ffffff'
]

const dangers = [
  '#000000',
  '#19030a',
  '#320614',
  '#4b091e',
  '#640c28',
  '#7d0f32',
  '#96123b',
  '#af1545',
  '#c8184f',
  '#e11b59',
  '#fa1e63',
  '#fb3573',
  '#fb4b82',
  '#fc6292',
  '#fc78a1',
  '#fd8fb1',
  '#fda5c1',
  '#febcd0',
  '#fed2e0',
  '#ffe9ef',
  '#ffffff'
]

const neutral = neutrals[10]
const primary = primaries[10]
const secondary = secondaries[10]
const danger = dangers[10]

const outline = primaries[17]

const onNeutral = neutrals[21]
const onPrimary = neutrals[21]
const onSecondary = neutrals[21]
const onDanger = neutrals[21]

const surface = neutrals[20]
const onSurface = neutrals[4]
const background = neutrals[18]
const onBackground = neutrals[20]

const neutralWidget = neutrals[17]
const neutralWidgetHighlighted = neutrals[18]
const neutralWidgetPressed = neutrals[15]
const neutralWidgetBorder = neutrals[15]
const onNeutralWidget = neutrals[2]

const primaryWidget = primaries[8]
const primaryWidgetHighlighted = primaries[11]
const primaryWidgetPressed = primaries[6]
const primaryWidgetBorder = primaries[7]
const onPrimaryWidget = primaries[20]

const dangerWidget = dangers[8]
const dangerWidgetHighlighted = dangers[11]
const dangerWidgetPressed = dangers[6]
const dangerWidgetBorder = dangers[7]
const onDangerWidget = dangers[20]

// EEL
const formula = primaries[8]
const term = secondaries[8]

export const colors = {
  primaries,
  secondaries,

  dangers,
  neutral,
  primary,
  secondary,
  danger,

  outline,

  onNeutral,
  onPrimary,
  onSecondary,
  onDanger,

  surface,
  background,

  onSurface,
  onBackground,

  formula,
  term,

  neutralWidget,
  neutralWidgetHighlighted,
  neutralWidgetPressed,
  neutralWidgetBorder,
  onNeutralWidget,

  primaryWidget,
  primaryWidgetHighlighted,
  primaryWidgetPressed,
  primaryWidgetBorder,
  onPrimaryWidget,

  dangerWidget,
  dangerWidgetHighlighted,
  dangerWidgetPressed,
  dangerWidgetBorder,
  onDangerWidget
}
