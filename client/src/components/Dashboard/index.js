import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Tabs, Tab, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { UserContext } from '../Context'
import MakeRequest from './MakeRequest'
import ResponseList from './ResponseList'
import CustomerList from './CustomerList'
import api from '../api'

const style = theme => ({
  root: {
    background: '#fff',
    display: 'flex',
    flexDirection: 'column'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    width: '100%',
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      padding: theme.spacing.unit * 3,
      width: '85%'
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
    isLoading: this.context.userDetails.userType === 'customer',
    customerConfirmed: false
  }

  handleTabChange = (event, value) => {
    this.setState({ value })
  }

  handleInnerChange = newChange => {
    this.setState({
      ...newChange
    })
  }

  async componentDidMount() {
    const { userType } = this.context.userDetails
    if (userType === 'customer') {
      const { data: result } = await api.get('/callout/customer')
      if (result.success) {
        const { hasActiveCallout } = result.data
        this.setState({
          loadingResponse: hasActiveCallout,
          isLoading: false
        })
      } else {
        alert(result.error)
      }
    }
  }

  renderRequestView = () => {
    const { loadingResponse, isLoading } = this.state
    if (isLoading) {
      return <Typography variant="body2">Loading...</Typography>
    }
    const user = this.context
    const { userType } = user.userDetails
    if (userType === 'customer') {
      if (!loadingResponse) {
        return <MakeRequest handleInnerChange={this.handleInnerChange} />
      } else if (loadingResponse) {
        return <ResponseList />
      }
    } else if (userType === 'professional') {
      return <CustomerList handleInnerChange={this.handleInnerChange} />
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
