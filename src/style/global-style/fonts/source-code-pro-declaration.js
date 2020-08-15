import blackItalic
  from '../../../../resources/fonts/source-code-pro/source-code-pro-black-italic.ttf'
import black from '../../../../resources/fonts/source-code-pro/source-code-pro-black.ttf'
import boldItalic from '../../../../resources/fonts/source-code-pro/source-code-pro-bold-italic.ttf'
import bold from '../../../../resources/fonts/source-code-pro/source-code-pro-bold.ttf'
import extraLightItalic
  from '../../../../resources/fonts/source-code-pro/source-code-pro-extra-light-italic.ttf'
import extraLight from '../../../../resources/fonts/source-code-pro/source-code-pro-extra-light.ttf'
import italic from '../../../../resources/fonts/source-code-pro/source-code-pro-italic.ttf'
import lightItalic
  from '../../../../resources/fonts/source-code-pro/source-code-pro-light-italic.ttf'
import light from '../../../../resources/fonts/source-code-pro/source-code-pro-light.ttf'
import mediumItalic
  from '../../../../resources/fonts/source-code-pro/source-code-pro-medium-italic.ttf'
import medium from '../../../../resources/fonts/source-code-pro/source-code-pro-medium.ttf'
import regular from '../../../../resources/fonts/source-code-pro/source-code-pro-regular.ttf'
import semiBoldItalic
  from '../../../../resources/fonts/source-code-pro/source-code-pro-semi-bold-italic.ttf'
import semiBold from '../../../../resources/fonts/source-code-pro/source-code-pro-semi-bold.ttf'
import { fontFace } from './font-face'

export const sourceCodeProFamily = 'SourceCodePro'

export const sourceCodeProDeclaration = `
  ${fontFace(sourceCodeProFamily, extraLight, 200, 'normal')}
  ${fontFace(sourceCodeProFamily, extraLightItalic, 200, 'italic')}
  ${fontFace(sourceCodeProFamily, light, 300, 'normal')}
  ${fontFace(sourceCodeProFamily, lightItalic, 300, 'italic')}
  ${fontFace(sourceCodeProFamily, regular, 400, 'normal')}
  ${fontFace(sourceCodeProFamily, italic, 400, 'italic')}
  ${fontFace(sourceCodeProFamily, medium, 500, 'normal')}
  ${fontFace(sourceCodeProFamily, mediumItalic, 500, 'italic')}
  ${fontFace(sourceCodeProFamily, semiBold, 600, 'normal')}
  ${fontFace(sourceCodeProFamily, semiBoldItalic, 600, 'italic')}
  ${fontFace(sourceCodeProFamily, bold, 700, 'normal')}
  ${fontFace(sourceCodeProFamily, boldItalic, 700, 'italic')}
  ${fontFace(sourceCodeProFamily, black, 900, 'normal')}
  ${fontFace(sourceCodeProFamily, blackItalic, 900, 'italic')}
  `
