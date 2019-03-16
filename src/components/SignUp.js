import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const style = theme => ({
  root: {
    flex: 1
  }
})

const SignUp = props => {
  const {
    classes: { root }
  } = props
  return <div className={root}>Sign up: To do</div>
}

export default withStyles(style)(SignUp)
