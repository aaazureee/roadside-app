import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Grid,
  Button,
  Typography,
  Paper,
  TextField,
  FormControl,
  Input,
  InputAdornment,
  FormHelperText
} from '@material-ui/core'
import { UserContext } from '../Context'
import api from '../api'

const style = theme => ({
  backBtn: {
    marginRight: theme.spacing.unit
  },
  paper: {
    marginBottom: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 3
  },
  listPrimaryText: {
    fontWeight: 500
  },
  listSecondaryText: {
    fontWeight: 400
  },
  gridSpacing: {
    marginTop: 16
  },
  gridTitle: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
    marginTop: 8,
    marginBottom: -4
  },
  denseGrid: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important'
  }
})

class SignUpReview extends Component {
  static contextType = UserContext

  redirectCustomer = async () => {
    const user = this.context
    const { userType, history } = this.props

    // remove unnecessary info before storing on client-side
    let { userDetails: extraUserDetails } = this.props
    const userDetails = { ...extraUserDetails }

    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      address,
      card: { ccName, ccNumber, ccExp, cvv }
    } = userDetails

    let { vehicleList } = userDetails

    vehicleList = vehicleList.map(x => ({
      model: x.carModel,
      plateNumber: x.carPlate
    }))

    const result = await api.post('/auth/register', {
      email,
      password,
      userType
    })

    if (result.data.success) {
      await api.post('/customer/details', {
        firstName,
        lastName,
        phone,
        address
      })
      await api.post('/customer/credit-card', {
        cardNumber: ccNumber,
        name: ccName,
        expireMonth: Number(ccExp.slice(0, 2)),
        expireYear: Number('20' + ccExp.slice(3, 5)),
        ccv: cvv
      })
      await api.post('/customer/vehicles', vehicleList)
      delete userDetails.password
      console.log('register success')
      user.updateUserDetails(userDetails) // update root user
      history.push('/')
    } else {
      alert(result.data.error)
      window.location.replace('/signup')
    }
  }

  redirectProfessional = async () => {
    const user = this.context
    const { userType, history } = this.props

    // remove unnecessary info before storing on client-side
    let { userDetails: extraUserDetails } = this.props
    delete extraUserDetails.customValue
    delete extraUserDetails.customSelected
    const userDetails = { ...extraUserDetails }

    delete userDetails.password
    console.log('register prof success')
    user.updateUserDetails(userDetails) // update root user
    history.push('/')
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.handleNext()
    const { userType } = this.props

    setTimeout(() => {
      if (userType === 'customer') {
        this.redirectCustomer()
      } else if (userType === 'professional') {
        this.redirectProfessional()
      }
    }, 500)
  }

  render() {
    const {
      classes: {
        backBtn,
        paper,
        listPrimaryText,
        listSecondaryText,
        gridSpacing,
        gridTitle,
        denseGrid
      },
      handleBack,
      userDetails,
      userType
    } = this.props

    const {
      email,
      firstName,
      lastName,
      address,
      phone,
      // customer
      vehicleList,
      card,
      // professional
      workingRadius,
      abn,
      account
    } = userDetails

    const userBasicDetails = [
      {
        name: 'Name',
        val: firstName + ' ' + lastName
      },
      {
        name: 'Email',
        val: email
      },
      {
        name: 'Address',
        val: address
      },
      {
        name: 'Phone',
        val: phone
      }
    ]

    return (
      <form onSubmit={this.handleSubmit}>
        {/* Basic details start */}
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" color="primary">
              Basic details
            </Typography>
          </Grid>

          {userBasicDetails.map(item => (
            <Grid item container xs={12} key={item.name}>
              <Grid item xs={4} sm={2}>
                <Typography variant="body2" className={listPrimaryText}>
                  {item.name}
                </Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <Typography variant="body2" className={listSecondaryText}>
                  {item.val}
                </Typography>
              </Grid>
            </Grid>
          ))}

          {/* Basic details end */}

          {/* Customer review */}
          {userType === 'customer' && (
            <Fragment>
              {/* Vehicle details start */}
              <Grid item xs={12} className={gridSpacing}>
                <Typography
                  variant="h6"
                  color="primary"
                  style={{
                    marginBottom: 8
                  }}
                >
                  Vehicle details
                </Typography>
              </Grid>

              <Grid item xs={12}>
                {vehicleList.map((vehicle, index) => (
                  <Paper className={paper} key={index}>
                    <Grid container spacing={24}>
                      <Grid item xs={12} className={gridTitle}>
                        <Typography variant="h6">{`Car ${index +
                          1}`}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} className={denseGrid}>
                        <TextField
                          id={`carModel${index}`}
                          name={`carModel`}
                          label="Car model"
                          type="text"
                          fullWidth
                          value={vehicle.carModel}
                          margin="dense"
                          InputProps={{
                            readOnly: true
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} className={denseGrid}>
                        <TextField
                          id={`carPlate${index}`}
                          name={`carPlate`}
                          label="Car plate"
                          type="text"
                          fullWidth
                          value={vehicle.carPlate}
                          margin="dense"
                          InputProps={{
                            readOnly: true
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Grid>
              {/* Vehicle details end */}

              {/* Card details start */}
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  color="primary"
                  style={{
                    marginBottom: 8
                  }}
                >
                  Payment details
                </Typography>
              </Grid>

              {/* Card details start */}
              <Grid item xs={12}>
                <Paper className={paper}>
                  <Grid container spacing={24}>
                    <Grid item xs={12} className={gridTitle}>
                      <Typography variant="h6">{`Credit Card`}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} className={denseGrid}>
                      <TextField
                        id={`ccName`}
                        name={`ccName`}
                        label="Name on card"
                        type="text"
                        fullWidth
                        value={card.ccName}
                        margin="dense"
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} className={denseGrid}>
                      <TextField
                        id={`ccNumber`}
                        name={`ccNumber`}
                        label="Card number"
                        type="tel"
                        fullWidth
                        value={card.ccNumber}
                        margin="dense"
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} className={denseGrid}>
                      <TextField
                        id={`ccExp`}
                        name={`ccExp`}
                        label="Expiry date"
                        type="text"
                        fullWidth
                        value={card.ccExp}
                        margin="dense"
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              {/* Card details end */}
            </Fragment>
          )}

          {/* Professional Review */}
          {userType === 'professional' && (
            <Fragment>
              <Grid item xs={12} className={gridSpacing}>
                <Typography
                  variant="h6"
                  color="primary"
                  style={{
                    marginBottom: 8
                  }}
                >
                  Work details
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Paper className={paper}>
                  <Grid container spacing={24}>
                    <Grid item xs={12}>
                      <label htmlFor="abn">
                        <Typography variant="h6">ABN</Typography>
                      </label>

                      <TextField
                        required
                        id="abn"
                        name="abn"
                        helperText="Australian Business Number (11-digit)"
                        InputProps={{
                          readOnly: true
                        }}
                        margin="dense"
                        InputLabelProps={{
                          shrink: true
                        }}
                        value={abn}
                        style={{
                          marginTop: 0
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      className={gridTitle}
                      style={{
                        marginBottom: -16
                      }}
                    >
                      <Typography variant="h6">Work radius</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} className={denseGrid}>
                      <FormControl>
                        <Input
                          id="customRadius"
                          name="workingRadius"
                          endAdornment={
                            <InputAdornment position="end">km</InputAdornment>
                          }
                          style={{
                            width: 75,
                            fontSize: '0.875rem',
                            marginTop: 18
                          }}
                          type="tel"
                          value={workingRadius}
                          readOnly
                        />

                        <FormHelperText id="weight-helper-text">
                          Work Radius
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  color="primary"
                  style={{
                    marginBottom: 8
                  }}
                >
                  Payment details
                </Typography>
              </Grid>

              {/* Card details start */}
              <Grid item xs={12}>
                <Paper className={paper}>
                  <Grid container spacing={24}>
                    <Grid item xs={12} className={gridTitle}>
                      <Typography variant="h6">Bank Account</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} className={denseGrid}>
                      <TextField
                        id="bsb"
                        name="bsb"
                        label="BSB"
                        type="tel"
                        fullWidth
                        value={account.bsb}
                        margin="dense"
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} className={denseGrid}>
                      <TextField
                        id="accountNumber"
                        name="accountNumber"
                        label="Account number"
                        type="tel"
                        fullWidth
                        value={account.accountNumber}
                        margin="dense"
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Fragment>
          )}

          <Grid
            item
            container
            justify="flex-end"
            xs={12}
            className={gridSpacing}
          >
            <Button onClick={handleBack} className={backBtn}>
              Back
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

export default withStyles(style)(SignUpReview)
