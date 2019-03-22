import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const style = theme => ({
  root: {
    flex: 1
  }
})

const LogIn = props => {
  const {
    classes: { root }
  } = props
  return <div className={root}>Login: To do</div>
}

export default withStyles(style)(LogIn)
