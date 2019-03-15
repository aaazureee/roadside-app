import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const style = theme => ({
  root: {
    minHeight: '100vh',
    background: 'linear-gradient(to left, #4568dc, #b06ab3)',
    color: theme.palette.primary.contrastText,
    padding: 16,
    '@media (min-width: 600px)': {
      padding: 24
    }
  },
  text: {
    marginTop: 56,
    '@media (min-width:0px) and (orientation: landscape)': {
      marginTop: 48
    },
    '@media (min-width:600px)': {
      marginTop: 64
    }
  }
})

class MainLanding extends Component {
  myRef = React.createRef()
  state = {
    root: {
      minHeight: '100vh',
      background: 'yellow'
    }
  }

  render() {
    const {
      classes: { root, text }
    } = this.props
    return (
      <div className={root} ref={this.myRef}>
        <Typography variant="h3" color="inherit" className={text}>
          {/* eslint-disable-next-line quotes */}
          {"Love Yourself 結 'Answer'"}
        </Typography>
      </div>
    )
  }
}

export default withStyles(style)(MainLanding)
