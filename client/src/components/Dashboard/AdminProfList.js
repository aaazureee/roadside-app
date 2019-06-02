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

class AdminProfList extends Component {
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

  async componentDidMount() {
    const { data: result } = await api.get('/admin/professional')
    if (result.success) {
      let userList = result.data
      console.log('here', userList)
      userList = userList.map(x => {
        const info = x.professionalInfo
        return {
          id: x.id,
          name: info.firstName + ' ' + info.lastName,
          email: x.email,
          address: info.address,
          phone: info.phone,
          status: x.banned ? 'Suspended' : 'Normal',
          workDetails: {
            abn: info.abn,
            workingRange: info.workingRange / 1000
          },
          accountDetails: {
            bsb: info.bsb,
            accountNumber: info.accountNumber
          }
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
        name: 'status',
        label: 'Status'
      },
      {
        name: 'workDetails',
        options: {
          display: false
        }
      },
      {
        name: 'accountDetails',
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
        let { abn, workingRange } = rowData[6]
        let { bsb, accountNumber } = rowData[7]
        let status = rowData[5]
        let id = rowData[0]

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
                Work details:
              </Typography>
              <Typography variant="body1" className={bodyText}>
                <span className={span}>ABN (Australian Business Number):</span>{' '}
                {abn}
              </Typography>
              <Typography variant="body1" className={bodyText}>
                <span className={span}>Work radius:</span>{' '}
                {`${workingRange} km`}
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
                Bank account details:
              </Typography>
              <Typography variant="body1" className={bodyText}>
                <span className={span}>BSB:</span> {bsb}
              </Typography>
              <Typography variant="body1" className={bodyText}>
                <span className={span}>Account number:</span> {accountNumber}
              </Typography>

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
          title={'System Roadside Professional List'}
          data={userList}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(AdminProfList)
