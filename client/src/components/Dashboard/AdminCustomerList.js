import React, { Component, Fragment } from 'react'
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  TableRow,
  TableCell
} from '@material-ui/core'
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles'
import { UserContext } from '../Context'
import MUIDataTable from 'mui-datatables'
import moment from 'moment'

import api from '../api'

const styles = theme => ({
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

class AdminCustomerList extends Component {
  static contextType = UserContext

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          paper: {
            maxWidth: 1100
          }
        },
        MuiTableCell: {
          root: {
            padding: 12
          }
        }
      },
      palette: {
        primary: {
          main: '#8E2DE2'
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
    const { data: result } = await api.get('/admin/customers')
    if (result.success) {
      let userList = result.data
      userList = userList.map(x => {
        const info = x.customerInfo
        return {
          id: x.id,
          name: info.firstName + ' ' + info.lastName,
          email: x.email,
          address: info.address,
          phone: info.phone,
          plan: info.plan === 'basic' ? 'Basic plan' : 'Premium plan',
          status: x.banned ? 'Suspended' : 'Normal',
          creditCard: info.creditCard,
          vehicleList: info.vehicles
        }
      })

      this.setState({
        isLoading: false,
        userList
      })
    } else {
      alert(result.error)
    }
  }

  handleBlock = async id => {
    const { data: result } = await api.post('/admin/ban', {
      userId: id
    })
    if (result.success) {
      this.setState(state => ({
        userList: state.userList.map(x => {
          if (x.id === id) {
            return {
              ...x,
              status: 'Suspended'
            }
          } else {
            return x
          }
        })
      }))
    } else {
      alert(result.error)
    }
  }

  handleUnblock = async id => {
    const { data: result } = await api.post('/admin/unban', {
      userId: id
    })
    if (result.success) {
      this.setState(state => ({
        userList: state.userList.map(x => {
          if (x.id === id) {
            return {
              ...x,
              status: 'Normal'
            }
          } else {
            return x
          }
        })
      }))
    } else {
      alert(result.error)
    }
  }

  render() {
    const { isLoading, userList } = this.state
    const {
      classes: { span, bodyText }
    } = this.props
    if (isLoading) return <Typography variant="body2">Loading...</Typography>

    const columns = [
      {
        name: 'id',
        options: {
          display: false
        }
      },
      {
        name: 'name',
        label: 'Full name'
      },
      {
        name: 'email',
        label: 'Email'
      },
      {
        name: 'address',
        label: 'Address'
      },
      {
        name: 'phone',
        label: 'Phone number'
      },
      {
        name: 'plan',
        label: 'Subscription plan'
      },
      {
        name: 'status',
        label: 'Status'
      },
      {
        name: 'creditCard',
        options: {
          display: false
        }
      },
      {
        name: 'vehicleList',
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
      renderExpandableRow: (rowData, rowMeta) => {
        const colSpan = rowData.length + 1
        let { cardNumber, expireMonth, expireYear } = rowData[7]
        let vehicleList = rowData[8]
        let status = rowData[6]
        let id = rowData[0]

        if (expireMonth.toString().length === 1) {
          expireMonth = '0' + expireMonth
        }

        return (
          <TableRow>
            <TableCell colSpan={colSpan}>
              <Typography
                variant="body1"
                className={bodyText}
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  marginTop: 8
                }}
              >
                Credit card details:
              </Typography>
              <Typography variant="body1" className={bodyText}>
                <span className={span}>Card number:</span>{' '}
                {`•••• ${cardNumber.slice(-4)}`}
              </Typography>
              <Typography variant="body1" className={bodyText}>
                <span className={span}>Card expiry:</span>{' '}
                {`${expireMonth}/${expireYear.toString().slice(-2)}`}
              </Typography>

              <Typography
                variant="body1"
                className={bodyText}
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  marginTop: 8
                }}
              >
                Vehicle details:
              </Typography>
              {vehicleList.map((vehicle, idx) => {
                const vehicleDetails = `${vehicle.make} ${vehicle.model} • ${
                  vehicle.plateNumber
                }`

                return (
                  <Fragment key={idx}>
                    <Typography variant="body1" className={bodyText}>
                      <span className={span}>{`Vehicle ${idx + 1}:`}</span>{' '}
                      {vehicleDetails}
                    </Typography>
                  </Fragment>
                )
              })}

              {status === 'Normal' ? (
                <Button
                  color="primary"
                  variant="contained"
                  style={{
                    marginBottom: 12
                  }}
                  onClick={() => this.handleBlock(id)}
                >
                  Block account
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="outlined"
                  style={{
                    marginBottom: 12
                  }}
                  onClick={() => this.handleUnblock(id)}
                >
                  Unblock account
                </Button>
              )}
            </TableCell>
          </TableRow>
        )
      }
    }

    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title={'System Customer List'}
          data={userList}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(AdminCustomerList)
