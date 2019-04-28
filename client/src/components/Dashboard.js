import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import MuiLink from './MuiLink'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

const style = theme => ({
  root: {
    background: '#fff',
    display: 'flex',
    flexDirection: 'column'
  }
})

class Dashboard extends Component {
  render() {
    const {
      classes: { root }
    } = this.props
    return (
      <main className={classNames('mainContent', root)}>
        <div>
          <Typography variant="h6">Dashboard</Typography>
        </div>
      </main>
    )
  }
}

export default withStyles(style)(Dashboard)
