import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Tabs, Tab, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { UserContext } from '../Context'
import MakeRequest from './MakeRequest'
import ResponseList from './ResponseList'
import CustomerList from './CustomerList'

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
    value: 0,
    loadingResponse: sessionStorage.getItem('loadingResponse') || false
  }

  handleTabChange = (event, value) => {
    this.setState({ value })
  }

  handleInnerChange = newChange => {
    this.setState({
      ...newChange
    })
  }

  renderRequestView = () => {
    const { loadingResponse } = this.state
    const user = this.context
    const { userType } = user.userDetails
    if (userType === 'customer') {
      if (!loadingResponse) {
        return <MakeRequest handleInnerChange={this.handleInnerChange} />
      } else if (loadingResponse) {
        return <ResponseList />
      }
    } else if (userType === 'professional') {
      return <CustomerList />
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

        <Paper className={paper}>
          {value === 0 && this.renderRequestView()}
        </Paper>
      </main>
    )
  }
}

export default withStyles(style)(Dashboard)
