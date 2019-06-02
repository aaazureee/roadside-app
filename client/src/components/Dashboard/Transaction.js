import React, { Component, Fragment } from 'react'
import { Grid, TextField, Button, Typography, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { UserContext } from '../Context'

import api from '../api'

const styles = theme => ({})

class Transaction extends Component {
  static contextType = UserContext

  initState = () => {}

  state = {}

  render() {
    return "Roadside service transactions"
  }
}

export default withStyles(styles)(Transaction)
