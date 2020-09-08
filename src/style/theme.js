import { createMuiTheme } from '@material-ui/core'
import {
  sourceSansFamily,
  sourceCodeProDeclaration,
  sourceSansProDeclaration,
  sourceCodeProFamily
} from './fonts'

export const theme = createMuiTheme({
  spacing: 4,
  palette: {
    formula: 'blue',
    term: 'purple'
  },
  typography: {
    // fontFamily: sourceSansFamily,
    mono: sourceCodeProFamily
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [...sourceSansProDeclaration, ...sourceCodeProDeclaration]
      }
    }
  }
})
