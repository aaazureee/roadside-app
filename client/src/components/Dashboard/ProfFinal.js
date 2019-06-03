import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Grid, TextField, Paper } from '@material-ui/core'
import { UserContext } from '../Context'

const style = theme => ({
  root: {
    background: '#fff',
    display: 'flex',
    flexDirection: 'column'
  },
  bodyText: {
    fontWeight: 400,
    marginBottom: 8,
    fontSize: '1rem',
    color: 'black'
  },
  span: {
    fontWeight: 500
  },
  paper: {
    padding: theme.spacing.unit * 2,
    width: 700
  }
})

class ProfFinal extends Component {
  static contextType = UserContext

  state = {}

  render() {
    const {
      classes: { bodyText, span, paper }
    } = this.props

    const {
      address,
      customerName,
      description,
      vehicle,
      customerPhone
    } = this.props.customerConfirmed

    const vehicleDetails = `${vehicle.make} ${vehicle.model} • ${
      vehicle.plateNumber
    }`

    return (
      <Fragment>
        <Typography variant="h6" color="primary" gutterBottom>
          The customer has confirmed your request offer.
        </Typography>
        <Paper className={paper}>
          <Typography variant="h6" color="primary" gutterBottom>
            Customer information
          </Typography>
          <Fragment>
            <Typography variant="body1" className={bodyText}>
              <span className={span}>Name:</span> {customerName}
            </Typography>
            <Typography variant="body1" className={bodyText}>
              <span className={span}>Phone number:</span> {customerPhone}
            </Typography>
          </Fragment>

          <Typography variant="h6" color="primary" gutterBottom>
            Roadside request information
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address"
                  name="address"
                  label="Customer's current location"
                  type="text"
                  fullWidth
                  value={address}
                  InputProps={{
                    readOnly: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="vehicle"
                  name="vehicle"
                  label="Vehicle"
                  type="text"
                  fullWidth
                  value={vehicleDetails}
                  InputProps={{
                    readOnly: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="description"
                  name="description"
                  value={description}
                  label="Description"
                  placeholder="Please provide your vehicle's issues"
                  multiline
                  rows="4"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              {/* <Grid item container justify="flex-end" xs={12}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.handleSubmit}
                >
                  Confirm request completion
                </Button>
              </Grid> */}
            </Grid>
          </form>
        </Paper>
      </Fragment>
    )
  }
}

export default withStyles(style)(ProfFinal)
