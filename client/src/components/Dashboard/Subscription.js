import React, { Component } from 'react'
import { Typography } from '@material-ui/core'
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles'
import { UserContext } from '../Context'
import MUIDataTable from 'mui-datatables'
import moment from 'moment'

import api from '../api'

const styles = () => ({})

class Subscription extends Component {
  static contextType = UserContext

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          paper: {
            maxWidth: 800
          }
        }
      },
      typography: {
        useNextVariants: true
      }
    })

  state = {
    isLoading: true
  }

  async componentDidMount() {
    const { data: result } = await api.get('/customer/subscriptions')
    if (result.success) {
      let subscriptions = result.data
      subscriptions = subscriptions.map(x => {
        const expiryDate = new Date(x.date)
        expiryDate.setFullYear(expiryDate.getFullYear() + 1)

        return {
          subscriptionType:
            Number(x.amount) === 0 ? 'Basic plan' : 'Premium plan',
          amount: Number(x.amount),
          subscriptionTime: new Date(x.date).getTime(),
          subscriptionExpiry:
            Number(x.amount) === 0 ? 'None' : expiryDate.getTime()
        }
      })

      console.log('here', subscriptions)

      this.setState({
        isLoading: false,
        subscriptions
      })
    } else {
      alert(result.error)
    }
  }

  render() {
    const { isLoading, subscriptions } = this.state
    if (isLoading) return <Typography variant="body2">Loading...</Typography>

    const columns = [
      {
        name: 'subscriptionType',
        label: 'Subscription to'
      },
      {
        name: 'amount',
        label: 'Amount',
        options: {
          filter: false,
          customBodyRender: value => {
            return `$${value}`
          }
        }
      },
      {
        name: 'subscriptionTime',
        label: 'Subscription time',
        options: {
          filter: false,
          customBodyRender: value => moment(value).format('DD/MM/YYYY, H:mm A')
        }
      },
      {
        name: 'subscriptionExpiry',
        label: 'Subscription expiry',
        options: {
          filter: false,
          customBodyRender: value => {
            if (value !== 'None') {
              return moment(value).format('DD/MM/YYYY, H:mm A')
            }
            return 'None'
          }
        }
      }
    ]

    const options = {
      filter: true,
      filterType: 'checkbox',
      print: false,
      download: false,
      selectableRows: false,
      responsive: 'scroll',
      rowsPerPage: 20,
      rowsPerPageOptions: [20, 50, 100]
    }

    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title={'Subscription History'}
          data={subscriptions}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(Subscription)
