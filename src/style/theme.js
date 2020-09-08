import { createMuiTheme } from '@material-ui/core'
import { purple, green } from '@material-ui/core/colors'
import {
  sourceSansFamily,
  sourceCodeProDeclaration,
  sourceSansProDeclaration,
  sourceCodeProFamily
} from './fonts'

export const theme = createMuiTheme({
  spacing: 4,
  palette: {
    primary: { main: purple['500'] },
    secondary: { main: green.A700 },
    formula: purple['500'],
    term: green.A700
  },
  typography: {
    fontFamily: sourceSansFamily,
    mono: sourceCodeProFamily,
    fontSize: 14
  },
  props: {
    MuiButton: {
      size: 'small'
    },
    MuiIconButton: {
      size: 'small'
    },
    MuiTextField: {
      size: 'small'
    },
    MuiCheckbox: {
      size: 'small'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [...sourceSansProDeclaration, ...sourceCodeProDeclaration]
      }
    },
    MuiButton: {
      root: {
        minWidth: 48
      },
      sizeSmall: {
        padding: 0
      }
    }
  }
})
