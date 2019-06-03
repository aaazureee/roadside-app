import React, { Component } from 'react'
import { Typography, TableRow, TableCell } from '@material-ui/core'
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles'
import { UserContext } from '../Context'
import MUIDataTable from 'mui-datatables'
import moment from 'moment'

import api from '../api'

const styles = () => ({
  span: {
    fontWeight: 500,
    fontSize: '0.8125rem'
  },
  bodyText: {
    fontWeight: 400,
    marginBottom: 8,
    fontSize: '0.8125rem'
    // color: 'black'
  }
})

class CustomerTransaction extends Component {
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
    const { data: result } = await api.get('/customer/service-payments')
    if (result.success) {
      let transactions = result.data

      transactions = transactions.map(x => {
        return {
          professionalName: x.professionalName,
          date: new Date(x.date).getTime(),
          amount: x.waived ? `$${x.amount} (Free)` : `$${x.amount}`,
          calloutInfo: x.calloutInfo
        }
      })

      this.setState({
        isLoading: false,
        transactions
      })
    } else {
      alert(result.error)
    }
  }

  render() {
    const { isLoading, transactions } = this.state
    const {
      classes: { span, bodyText }
    } = this.props
    if (isLoading) return <Typography variant="body2">Loading...</Typography>

    const columns = [
      {
        name: 'professionalName',
        label: 'Roadside Professional'
      },
      {
        name: 'date',
        label: 'Time completed',
        options: {
          filter: false,
          customBodyRender: value => moment(value).format('DD/MM/YYYY, H:mm A')
        }
      },
      {
        name: 'amount',
        label: 'Amount'
      },
      {
        name: 'calloutInfo',
        options: {
          display: false
        }
      }
    ]

    const options = {
      filter: false,
      print: false,
      download: false,
      selectableRows: false,
      responsive: 'scroll',
      expandableRows: true,
      rowsPerPage: 20,
      rowsPerPageOptions: [20, 50, 100],
      renderExpandableRow: rowData => {
        const colSpan = rowData.length + 1
        const { address, description, vehicle } = rowData[3]
        const vehicleDetails = `${vehicle.make} ${vehicle.model} • ${
          vehicle.plateNumber
        }`
        return (
          <TableRow>
            <TableCell colSpan={colSpan}>
              <Typography
                variant="body1"
                className={bodyText}
                style={{
                  marginTop: 8
                }}
              >
                <span className={span}>Location:</span> {address}
              </Typography>
              <Typography variant="body1" className={bodyText}>
                <span className={span}>Vehicle:</span> {vehicleDetails}
              </Typography>
              <Typography
                variant="body1"
                className={bodyText}
                style={{
                  marginBottom: 4
                }}
              >
                <span className={span}>Description:</span>
              </Typography>
              <Typography variant="body1" className={bodyText}>
                {description}
              </Typography>
            </TableCell>
          </TableRow>
        )
      }
    }

    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title={'Service Payment History'}
          data={transactions}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(CustomerTransaction)
