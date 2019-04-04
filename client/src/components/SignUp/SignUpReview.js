import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Button, Typography, Paper, TextField } from '@material-ui/core'

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
  sectionTitle: {
    fontSize: '1.5rem'
  },
  gridSpacing: {
    marginTop: 16
  },
  gridTitle: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
    marginTop: 8,
    marginBottom: -8
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
        sectionTitle,
        gridSpacing,
        gridTitle,
        denseGrid
      },
      handleBack,
      userDetails
    } = this.props

    console.log('In customer review', userDetails)

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
      vehicleList,
      cardList
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
            <Typography
              variant="h6"
              className={sectionTitle}
              color="primary"
              style={{
                marginBottom: 8
              }}
            >
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

          {/* Vehicle details start */}
          <Grid item xs={12} className={gridSpacing}>
            <Typography
              variant="h6"
              className={sectionTitle}
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
                    <Typography variant="h6">{`Car ${index + 1}`}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} className={denseGrid}>
                    <TextField
                      required
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
                      required
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
              className={sectionTitle}
              color="primary"
              style={{
                marginBottom: 8
              }}
            >
              Payment details
            </Typography>
          </Grid>

          <Grid item xs={12}>
            {cardList.map((card, index) => (
              <Paper className={paper} key={index}>
                <Grid container spacing={24}>
                  <Grid item xs={12} className={gridTitle}>
                    <Typography variant="h6">{`Card ${index + 1}`}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} className={denseGrid}>
                    <TextField
                      required
                      id={`ccName${index}`}
                      name={`ccName`}
                      label="Name on card"
                      type="text"
                      fullWidth
                      value={card.ccName}
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={denseGrid}>
                    <TextField
                      required
                      id={`ccNumber${index}`}
                      name={`ccNumber`}
                      label="Card number"
                      type="tel"
                      fullWidth
                      value={card.ccNumber}
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={denseGrid}>
                    <TextField
                      required
                      id={`ccExp${index}`}
                      name={`ccExp`}
                      label="Expiry date"
                      type="text"
                      fullWidth
                      value={card.ccExp}
                      margin="dense"
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Grid>
          {/* Card details end */}

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
