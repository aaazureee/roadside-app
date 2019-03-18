import React, { Component } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Paper } from '@material-ui/core'

const style = theme => ({
  root: {
    background: '#fafafa'
  },
  paper: {
    height: 300
  }
})

class SignUp extends Component {
  componentDidMount() {
    this.props.persistOutlinedBtn()
  }

  render() {
    const {
      classes: { root, paper }
    } = this.props
    return (
      <main className={classNames('mainContent', root)}>
        <Paper className={paper}>
          <Typography variant="h5" color="primary">
            Sign up
          </Typography>
        </Paper>
      </main>
    )
  }

  componentWillUnmount() {
    this.props.resetTheme()
  }
}

export default withStyles(style)(SignUp)
