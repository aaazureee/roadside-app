import React, { Component, Fragment } from 'react'
import { Grid, TextField, Button, Typography, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { UserContext } from '../Context'

import api from '../api'

const styles = theme => ({})

class Subscription extends Component {
  static contextType = UserContext

  initState = () => {}

  state = {}

  render() {
    return 'Subscription history'
  }
}

export default withStyles(styles)(Subscription)
