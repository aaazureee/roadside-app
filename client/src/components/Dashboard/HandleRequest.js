import React, { Component, Fragment } from 'react'
import { Grid, TextField, Button, Typography } from '@material-ui/core'
import { UserContext } from '../Context'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'

const style = theme => ({
  root: {
    background: '#fff',
    display: 'flex',
    flexDirection: 'column'
  }
})

class HandleRequest extends Component {
  static contextType = UserContext

  render() {
    return <Typography variant="h6">List of nearby customers</Typography>
  }
}

export default withStyles(style)(HandleRequest)
