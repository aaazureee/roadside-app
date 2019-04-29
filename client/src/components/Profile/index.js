import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Tabs, Tab, Typography } from '@material-ui/core'
import BasicProfile from './BasicProfile'
import PaymentProfile from './PaymentProfile'
import VehicleProfile from './VehicleProfile'
import AccountProfile from './AccountProfile'
import WorkProfile from './WorkProfile'
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
      width: 500
    }
  },
  tab: {
    maxWidth: 500,
    marginBottom: 16
  }
})

class Profile extends Component {
  static contextType = UserContext
  state = {
    value: 0
  }

  handleTabChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const {
      classes: { root, paper, tab }
    } = this.props

    const user = this.context
    const { userType } = user.userDetails

    const { value } = this.state
    return (
      <main className={classNames('mainContent', root)}>
        <Typography variant="h5" color="primary" gutterBottom>
          Profile
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
          <Tab label="Basic details" />
          {userType === 'customer' ? (
            <Tab label="Vehicle" />
          ) : (
            <Tab label="Work" />
          )}
          <Tab label="Payment" />
        </Tabs>

        <Paper className={paper}>
          {value === 0 && <BasicProfile />}

          {value === 1 && userType === 'customer' && <VehicleProfile />}
          {value === 2 && userType === 'customer' && <PaymentProfile />}

          {value === 1 && userType === 'professional' && <WorkProfile />}
          {value === 2 && userType === 'professional' && <AccountProfile />}
        </Paper>
      </main>
    )
  }
}

export default withStyles(style)(Profile)
