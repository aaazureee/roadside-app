import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Dialog
} from '@material-ui/core'
import { UserContext } from '../Context'
import RatingReviewModal from './RatingReviewModal'

import api from '../api'

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
  },
  dialogPaper: {
    minWidth: 500
  }
})

class CustFinal extends Component {
  static contextType = UserContext

  state = {
    isLoading: true,
    modalOpen: false
  }

  async componentDidMount() {
    const { data: result } = await api.get('/callout/customer')
    if (result.success) {
      const {
        chosenProfessional,
        address,
        location,
        vehicle,
        description
      } = result.data

      this.setState({
        confirmProfessional: chosenProfessional,
        address,
        location,
        vehicle,
        description,
        isLoading: false
      })
    } else {
      alert(result.error)
    }
  }

  handleSubmit = async event => {
    event.preventDefault()
    this.setState({
      modalOpen: true
    })
  }

  render() {
    const {
      classes: { bodyText, span, paper, dialogPaper }
    } = this.props

    const { isLoading } = this.state

    if (isLoading) return <Typography variant="body2">Loading...</Typography>

    const {
      confirmProfessional: {
        fullName,
        price,
        phone,
        location: { coordinates: coordinates1 }
      },
      address,
      location: { coordinates: coordinates2 },
      vehicle,
      description
    } = this.state

    const user = this.context
    const vehicleDetails = `${vehicle.make} ${vehicle.model} • ${
      vehicle.plateNumber
    }`

    return (
      <Fragment>
        <Typography variant="h6" color="primary" gutterBottom>
          The chosen roadside professional is on the way to assist you. Please
          be patience...
        </Typography>
        <Paper className={paper}>
          <Typography variant="h6" color="primary" gutterBottom>
            Chosen professional details
          </Typography>
          <Fragment>
            <Typography variant="body1" className={bodyText}>
              <span className={span}>Name:</span> {fullName}
            </Typography>
            <Typography variant="body1" className={bodyText}>
              <span className={span}>Phone number:</span> {phone}
            </Typography>
            <Typography variant="body1" className={bodyText}>
              <span className={span}>Pricing:</span> ${price}
            </Typography>
          </Fragment>

          <Typography variant="h6" color="primary" gutterBottom>
            Your current roadside request
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address"
                  name="address"
                  label="Current location"
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
              <Grid item container justify="flex-end" xs={12}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.handleSubmit}
                >
                  Confirm request completion
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <Dialog
          open={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
          classes={{
            paper: dialogPaper
          }}
        >
          <RatingReviewModal
            confirmProfessional={this.state.confirmProfessional}
            handleInnerChange={this.props.handleInnerChange}
            onClose={() =>
              this.setState({
                modalOpen: false
              })
            }
          />
        </Dialog>
      </Fragment>
    )
  }
}

export default withStyles(style)(CustFinal)
