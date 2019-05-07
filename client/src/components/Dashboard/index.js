import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Tabs, Tab, Typography } from '@material-ui/core'
import MakeRequest from './MakeRequest'
import classNames from 'classnames'
import { UserContext } from '../Context'

const style = theme => ({
  root: {
    background: '#fff',
    display: 'flex',
    flexDirection: 'column'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      padding: theme.spacing.unit * 3,
      width: '100%'
    }
  },
  tab: {
    maxWidth: 200,
    marginBottom: 16
  }
})

class Dashboard extends Component {
  static contextType = UserContext
  state = {
    value: 0
  }

  handleTabChange = (event, value) => {
    this.setState({ value })
  }

  renderRequestView = () => {
    const { value } = this.state
    const user = this.context
    const { userType } = user.userDetails
    if (userType === 'customer') {
      return <MakeRequest />
    } else if (userType === 'professional') {
      return <div>Professional dashboard handler</div>
    }
  }

  render() {
    const {
      classes: { root, paper, tab }
    } = this.props

    const { value } = this.state
    return (
      <main className={classNames('mainContent', root)}>
        <Typography variant="h5" color="primary" gutterBottom>
          Dashboard
        </Typography>
        <Tabs
          value={value}
          name="value"
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          className={tab}
        >
          <Tab label="Roadside Request" />
        </Tabs>

        <Paper className={paper}>{this.renderRequestView()}</Paper>
      </main>
    )
  }
}

export default withStyles(style)(Dashboard)
