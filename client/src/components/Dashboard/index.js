import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Tabs, Tab, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { UserContext } from '../Context'
import MakeRequest from './MakeRequest'
import ResponseList from './ResponseList'
import CustomerList from './CustomerList'
import CustFinal from './CustFinal'
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
          <div>
            Customer has confirmed your request offer.{' '}
            {JSON.stringify(customerConfirmed)}
          </div>
        )
      }
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

        {value === 0 && this.renderRequestView()}
      </main>
    )
  }
}

export default withStyles(style)(Dashboard)
