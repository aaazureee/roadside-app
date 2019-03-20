import React, { Component } from 'react'
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import Root from './Root'

const primaryColor = '#8E2DE2'
const secondaryColor = '#00ca69'

const theme = {
  palette: {
    primary: {
      main: primaryColor
    },
    secondary: {
      main: secondaryColor,
      contrastText: '#FFF'
    },
    background: {
      default: '#FFF'
    }
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none'
      },
      outlined: {
        padding: '5px 16px',
        borderRadius: '20px',
        border: '2px solid #FFF',
        '&:hover': {
          background: secondaryColor,
          border: `2px solid ${secondaryColor}`
        }
      }
    },
    MuiTypography: {
      h6: {
        fontSize: '1rem'
      },
      h3: {
        fontWeight: 500
      },
      h5: {
        fontWeight: 500
      },
      body2: {
        fontWeight: 500
      }
    },
    MuiInput: {
      underline: {
        '&&&&:hover:before': {
          borderBottom: `2px solid ${primaryColor}`
        }
      }
    },
    MuiFormLabel: {
      root: {
        fontWeight: 500,
        color: 'rgba(0, 0, 0, 0.44)'
      }
    },
    MuiStepIcon: {
      text: {
        fontWeight: 500
      }
    },
    MuiInputBase: {
      root: {
        fontWeight: 500
      }
    }
  },
  typography: {
    fontFamily: 'Montserrat',
    useNextVariants: true
  }
}

class App extends Component {
  state = {
    theme: createMuiTheme(theme)
  }

  persistOutlinedBtn = () => {
    let clone = JSON.parse(JSON.stringify(theme))
    let muiOutlinedBtn = clone.overrides.MuiButton.outlined
    muiOutlinedBtn.border = `2px solid ${secondaryColor} !important`
    muiOutlinedBtn.background = secondaryColor
    this.setState(() => ({
      theme: createMuiTheme(clone)
    }))
  }

  resetTheme = () => {
    this.setState(() => ({
      theme: createMuiTheme(theme)
    }))
  }

  render() {
    return (
      <MuiThemeProvider theme={this.state.theme}>
        <CssBaseline />
        <Root
          resetTheme={this.resetTheme}
          persistOutlinedBtn={this.persistOutlinedBtn}
        />
      </MuiThemeProvider>
    )
  }
}

const styles = theme => ({
  '@global': {
    '*': {
      padding: 0,
      margin: 0
    },
    '.mainContent': {
      flex: 1,
      padding: 16,
      '@media (min-width: 600px)': {
        padding: 24
      },
      marginTop: 56,
      '@media (min-width:0px) and (orientation: landscape)': {
        marginTop: 48
      },
      '@media (min-width:600px)': {
        marginTop: 64
      }
    }
  }
})

export default withStyles(styles)(App)
