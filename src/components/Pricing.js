import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const style = theme => ({
  root: {
    flex: 1
  }
})

const Pricing = props => {
  const {
    classes: { root }
  } = props
  return <div className={root}>Pricing: To do</div>
}

export default withStyles(style)(Pricing)
