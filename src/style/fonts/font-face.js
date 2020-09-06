/** Create `@font-face` css declaration */
export const fontFace = (family, filePath, weight, style) => ({
  fontFamily: family,
  src: `url(${filePath})`,
  fontWeight: weight,
  fontStyle: style
})
