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
  handleSubmit = event => {
    event.preventDefault()
    this.props.handleNext()
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

    console.log('In review', userDetails)

    // userDetails = {
    //   address: '5 Cowper Street, Fairy Meadow, Wollongong',
    //   cardList: [
    //     {
    //       ccName: 'HC',
    //       ccNumber: '1111111111111111',
    //       ccExp: '09/20',
    //       cvv: '123'
    //     }
    //   ],
    //   email: 'aaazureee@gmail.com',
    //   firstName: 'Hieu',
    //   lastName: 'Chu',
    //   password: '1',
    //   phone: '416731359',
    //   userType: 'customer',
    //   vehicleList: [{ carModel: 'x', carPlate: 'x' }]
    // }

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
                    <Grid
                      item
                      xs={12}
                      className={gridTitle}
                      style={{
                        marginBottom: -16
                      }}
                    >
                      <Typography variant="h6">{`Work radius`}</Typography>
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
                          type="number"
                          value={workingRadius}
                          readOnly
                        />

                        <FormHelperText id="weight-helper-text">
                          Radius
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
                      <Typography variant="h6">{`Bank Account`}</Typography>
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
