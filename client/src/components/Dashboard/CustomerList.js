import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  Input,
  InputLabel,
  InputAdornment
} from '@material-ui/core'
import { Person } from '@material-ui/icons'
import { grey } from '@material-ui/core/colors'
import { UserContext } from '../Context'
import { calcDistance } from './utils'
import api from '../api'

const styles = theme => ({
  avatar: {
    color: grey[200],
    background: theme.palette.primary.main,
    width: 40,
    height: 40
  },
  accountIcon: {
    fontSize: 32
  },
  primaryText: {
    fontWeight: 500
  },
  secondaryText: {
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.60)'
  },
  paper: {
    marginTop: 8,
    padding: 12,
    paddingTop: 4
  },
  bodyText: {
    fontWeight: 400,
    marginBottom: 8,
    fontSize: '0.95rem'
    // color: 'black'
  },
  dialogPaper: {
    minWidth: 400
  },
  span: {
    fontWeight: 500
  }
})
class CustomerList extends Component {
  static contextType = UserContext

  state = {
    open: false,
    price: '',
    calloutId: '',
    isLoading: true
  }

  async componentDidMount() {
    const { data: result } = await api.get('/callout/professional')
    if (result.success) {
      const { nearbyCallouts } = result.data
      this.setState({
        nearbyCallouts,
        isLoading: false
      })
    } else {
      alert(result.error)
    }
  }

  // TODO decline
  handleDecline = async (event, calloutId) => {
    event.preventDefault()

    const { data: result } = await api.post(
      '/callout/professional/decline-callout',
      {
        id: calloutId
      }
    )
    if (result.success) {
      this.setState(state => ({
        nearbyCallouts: state.nearbyCallouts.filter(
          callout => callout.id !== calloutId
        )
      }))
    } else {
      console.log(result.error)
    }
  }

  handleAccept = async (event, calloutId, price) => {
    event.preventDefault()
    const { data: result } = await api.post(
      '/callout/professional/accept-callout',
      {
        id: calloutId,
        price: Number(price)
      }
    )
    if (result.success) {
      this.setState(state => ({
        nearbyCallouts: this.state.nearbyCallouts.map(callout => {
          if (callout.id === calloutId) {
            return {
              ...callout,
              price
            }
          } else {
            return callout
          }
        }),
        open: false
      }))
    } else {
      console.log(result.error)
    }
  }

  handleOpen = calloutId => {
    this.setState({ open: true, calloutId })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handlePriceChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const {
      classes: {
        avatar,
        accountIcon,
        primaryText,
        secondaryText,
        bodyText,
        paper,
        dialogPaper,
        gridItem,
        span
      }
    } = this.props

    const { price, isLoading, nearbyCallouts } = this.state

    // my location
    const myLat = this.context.userDetails.location.coordinates[1]
    const myLng = this.context.userDetails.location.coordinates[0]

    if (isLoading) {
      return <Typography variant="body2">Loading...</Typography>
    }

    if (!nearbyCallouts || !nearbyCallouts.length) {
      return (
        <Typography
          variant="body2"
          style={{
            fontSize: '1rem'
          }}
        >
          There are currently no nearby roadside requests. Please try again
          later.
        </Typography>
      )
    }

    return (
      <Fragment>
        <Typography variant="h6" color="primary" gutterBottom>
          Nearby callout request
        </Typography>
        <Grid container spacing={16}>
          {nearbyCallouts.map(callout => {
            const {
              id: calloutId,
              customerName,
              vehicle,
              description,
              location: { coordinates },
              address,
              plan,
              price: fetchedPrice
            } = callout

            // customer location
            const custLat = coordinates[1]
            const custLng = coordinates[0]

            return (
              <Grid item className={gridItem} key={calloutId}>
                <Paper className={paper}>
                  <List disablePadding>
                    <ListItem disableGutters>
                      <ListItemText
                        primary={
                          <div>
                            {customerName} •{' '}
                            <span
                              style={{
                                fontWeight: 400,
                                color: 'rgba(0, 0, 0, 0.60)'
                              }}
                            >
                              {plan[0].toUpperCase() + plan.slice(1)} Customer
                            </span>
                          </div>
                        }
                        secondary={`Relative distance: ${calcDistance(
                          myLat,
                          myLng,
                          custLat,
                          custLng
                        )}km`}
                        classes={{
                          primary: primaryText,
                          secondary: secondaryText
                        }}
                      />
                      <ListItemIcon
                        style={{
                          marginRight: 0
                        }}
                      >
                        <Avatar className={avatar}>
                          <Person className={accountIcon} />
                        </Avatar>
                      </ListItemIcon>
                    </ListItem>
                  </List>
                  <Fragment>
                    <Fragment />
                    <Typography variant="body1" className={bodyText}>
                      <span className={span}>Current location:</span> {address}
                    </Typography>
                    <Typography variant="body1" className={bodyText}>
                      <span className={span}>Vehicle:</span>{' '}
                      {`${vehicle.make} ${vehicle.model} • ${
                        vehicle.plateNumber
                      }`}
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
                  </Fragment>

                  <Grid container justify="flex-end">
                    <Grid item>
                      {!fetchedPrice ? (
                        <Fragment>
                          <Button
                            color="primary"
                            onClick={evt => this.handleDecline(evt, calloutId)}
                          >
                            Decline
                          </Button>
                          <Button
                            color="primary"
                            onClick={() => this.handleOpen(calloutId)}
                          >
                            Accept
                          </Button>
                        </Fragment>
                      ) : (
                        <Typography variant="body1" className={bodyText}>
                          <span
                            style={{
                              fontWeight: 500
                            }}
                          >
                            Your proposed price:
                          </span>{' '}
                          ${fetchedPrice}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>

                  <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    classes={{
                      paper: dialogPaper
                    }}
                  >
                    <form
                      onSubmit={evt =>
                        this.handleAccept(evt, this.state.calloutId, price)
                      }
                    >
                      <DialogTitle>Provide quote</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          To provide service for this customer, please enter
                          your service price.
                        </DialogContentText>
                        <FormControl
                          fullWidth
                          required
                          style={{
                            marginTop: 8
                          }}
                        >
                          <InputLabel htmlFor="price">Price</InputLabel>
                          <Input
                            required
                            autoFocus
                            id="price"
                            name="price"
                            startAdornment={
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            }
                            inputProps={{
                              pattern: '\\d+',
                              title: 'Please enter a numeric value.',
                              autoComplete: 'off'
                            }}
                            type="text"
                            onChange={this.handlePriceChange}
                          />
                        </FormControl>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button color="primary" type="submit">
                          Submit
                        </Button>
                      </DialogActions>
                    </form>
                  </Dialog>
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Fragment>
    )
  }
}

export default withStyles(styles)(CustomerList)
