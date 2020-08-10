/** Create `@font-face` css declaration (substitute for undocumented polished version) */
export const fontFace = (family, filePath, weight, style) => `
@font-face {
  font-family: '${family}';
  src: url(${filePath});
  font-weight: ${weight};
  font-style: ${style};
}
`
