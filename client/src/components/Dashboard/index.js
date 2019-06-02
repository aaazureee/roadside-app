import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Tabs, Tab, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { UserContext } from '../Context'
import MakeRequest from './MakeRequest'
import ResponseList from './ResponseList'
import CustomerList from './CustomerList'
import CustFinal from './CustFinal'
import ProfFinal from './ProfFinal'
import RatingReviewList from './RatingReviewList'
import Transaction from './Transaction'
import Subscription from './Subscription'
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
    marginBottom: 16
  }
})

class Dashboard extends Component {
  static contextType = UserContext
  state = {
    value: 0,
    isLoading: true,
    confirmProfessional: null, // for customer
    customerConfirmed: null, // for professional
    loadingResponse: false
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
        const { hasActiveCallout, chosenProfessional } = result.data
        this.setState({
          loadingResponse: hasActiveCallout,
          confirmProfessional: chosenProfessional,
          isLoading: false
        })
      } else {
        alert(result.error)
      }
    } else if (userType === 'professional') {
      const { data: result } = await api.get('/callout/professional')
      if (result.success) {
        const { calloutInfo } = result.data
        this.setState({
          customerConfirmed: calloutInfo,
          isLoading: false
        })
      } else {
        alert(result.error)
      }
    }
  }

  renderRequestView = () => {
    const {
      loadingResponse,
      isLoading,
      confirmProfessional,
      customerConfirmed
    } = this.state

    if (isLoading) {
      return <Typography variant="body2">Loading...</Typography>
    }
    const user = this.context
    const { userType } = user.userDetails
    if (userType === 'customer') {
      if (confirmProfessional) {
        return <CustFinal handleInnerChange={this.handleInnerChange} />
      }
      if (!loadingResponse) {
        return <MakeRequest handleInnerChange={this.handleInnerChange} />
      }
      return <ResponseList handleInnerChange={this.handleInnerChange} />
    } else if (userType === 'professional') {
      if (customerConfirmed) {
        return (
          <ProfFinal
            handleInnerChange={this.handleInnerChange}
            customerConfirmed={customerConfirmed}
          />
        )
      }
      return <CustomerList handleInnerChange={this.handleInnerChange} />
    }
  }

  renderTabContents = (userType, value) => {
    if (userType === 'admin') {
      if (value === 0) {
        return <div>User list</div>
      } else if (value === 1) {
        return <div>System Transactions</div>
      } else if (value === 2) {
        return <div>System Subscriptions</div>
      }
    }

    if (userType === 'customer') {
      if (value === 0) {
        return this.renderRequestView()
      } else if (value === 1) {
        return <Transaction />
      } else if (value === 2) {
        return <Subscription />
      }
    }

    if (userType === 'professional') {
      if (value === 0) {
        return this.renderRequestView()
      } else if (value === 1) {
        return <Transaction />
      } else if (value === 2) {
        return <RatingReviewList />
      }
    }
  }

  render() {
    const {
      classes: { root, paper, tab }
    } = this.props

    const { userType } = this.context.userDetails

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
          className={tab}
        >
          {userType === 'admin' && [
            <Tab key="1" label="User list" />,
            <Tab key="2" label="Transaction" />,
            <Tab key="3" label="Subscription" />
          ]}

          {userType === 'customer' && [
            <Tab key="1" label="Roadside Request" />,
            <Tab key="2" label="Transaction" />,
            <Tab key="3" label="Subscription" />
          ]}

          {userType === 'professional' && [
            <Tab key="1" label="Roadside Request" />,
            <Tab key="2" label="Transaction" />,
            <Tab key="3" label="Ratings and Reviews" />
          ]}
        </Tabs>

        {this.renderTabContents(userType, value)}
      </main>
    )
  }
}

export default withStyles(style)(Dashboard)
