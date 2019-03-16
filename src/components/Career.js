import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const style = theme => ({
  root: {
    flex: 1
  }
})

const Career = props => {
  const {
    classes: { root }
  } = props
  return <div className={root}>Career: To do</div>
}

export default withStyles(style)(Career)
