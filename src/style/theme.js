import { createMuiTheme } from '@material-ui/core'
import { purple, green } from '@material-ui/core/colors'

export const theme = createMuiTheme({
  spacing: 4,
  palette: {
    // primary: { main: purple['500'] },
    // secondary: { main: green.A700 },
    formula: purple['500'],
    term: green.A700
  },
  typography: {
    fontFamily: 'SourceSansPro',
    mono: 'SourceCodePro'
  },
  props: {
    MuiButton: {
      size: 'small'
    },
    MuiButtonGroup: {
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
    },
    MuiTable: {
      size: 'small'
    },
    MuiSnackbar: {
      autoHideDuration: 5000
    }
  },
  overrides: {
    MuiButton: {
      root: {
        minWidth: 48
      }
    }
  }
})
