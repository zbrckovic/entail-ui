import blackItalic
  from '../../../../resources/fonts/source-sans-pro/source-sans-pro-black-italic.ttf'
import black from '../../../../resources/fonts/source-sans-pro/source-sans-pro-black.ttf'
import boldItalic from '../../../../resources/fonts/source-sans-pro/source-sans-pro-bold-italic.ttf'
import bold from '../../../../resources/fonts/source-sans-pro/source-sans-pro-bold.ttf'
import extraLightItalic
  from '../../../../resources/fonts/source-sans-pro/source-sans-pro-extra-light-italic.ttf'
import extraLight from '../../../../resources/fonts/source-sans-pro/source-sans-pro-extra-light.ttf'
import italic from '../../../../resources/fonts/source-sans-pro/source-sans-pro-italic.ttf'
import lightItalic
  from '../../../../resources/fonts/source-sans-pro/source-sans-pro-light-italic.ttf'
import light from '../../../../resources/fonts/source-sans-pro/source-sans-pro-light.ttf'
import regular from '../../../../resources/fonts/source-sans-pro/source-sans-pro-regular.ttf'
import semiBoldItalic
  from '../../../../resources/fonts/source-sans-pro/source-sans-pro-semi-bold-italic.ttf'
import semiBold from '../../../../resources/fonts/source-sans-pro/source-sans-pro-semi-bold.ttf'
import { fontFace } from './font-face'

export const sourceSansFamily = 'SourceSansPro'

export const sourceSansProDeclaration = `
  ${fontFace(sourceSansFamily, extraLight, 200, 'normal')}
  ${fontFace(sourceSansFamily, extraLightItalic, 200, 'italic')}
  ${fontFace(sourceSansFamily, light, 300, 'normal')}
  ${fontFace(sourceSansFamily, lightItalic, 300, 'italic')}
  ${fontFace(sourceSansFamily, regular, 400, 'normal')}
  ${fontFace(sourceSansFamily, italic, 400, 'italic')}
  ${fontFace(sourceSansFamily, semiBold, 600, 'normal')}
  ${fontFace(sourceSansFamily, semiBoldItalic, 600, 'italic')}
  ${fontFace(sourceSansFamily, bold, 700, 'normal')}
  ${fontFace(sourceSansFamily, boldItalic, 700, 'italic')}
  ${fontFace(sourceSansFamily, black, 900, 'normal')}
  ${fontFace(sourceSansFamily, blackItalic, 900, 'italic')}
`
