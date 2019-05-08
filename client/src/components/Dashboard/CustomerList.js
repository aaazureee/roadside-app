import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  Avatar,
  ListItemText,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  FormControl,
  Input,
  InputLabel,
  InputAdornment
} from '@material-ui/core'
import { Person } from '@material-ui/icons'
import { grey } from '@material-ui/core/colors'
import { UserContext } from '../Context'
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
  gridItem: {
    minWidth: 400,
    width: '100%',
    marginLeft: 0,
    [theme.breakpoints.up(890)]: {
      flexBasis: '50%'
    }
  }
})
class CustomerList extends Component {
  static contextType = UserContext
  // TODO post API to get list => map to render
  state = {
    open: false,
    price: '',
    isLoading: true,
    calloutId: ''
  }

  async componentDidMount() {
    const { data: result } = await api.get('/callout/professional')
    if (result.success) {
      console.log('nearby callout data', result.data)
      const { customerConfirmed, nearbyCallouts } = result.data
      this.props.handleInnerChange({ customerConfirmed })
      this.setState({
        nearbyCallouts,
        isLoading: false
      })
    } else {
      alert(result.error)
    }
  }

  handleDecline = something => {}

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
      console.log(result)
      this.setState(state => ({
        nearbyCallouts: state.nearbyCallouts.map(callout => {
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
        gridItem
      }
    } = this.props

    const { price, nearbyCallouts, isLoading } = this.state

    if (isLoading)
      return (
        <Typography variant="body2">Loading nearby customers...</Typography>
      )

    return (
      <Fragment>
        <Typography variant="h6" color="primary" gutterBottom>
          Nearby callout request
        </Typography>
        <Fragment>
          <Grid container spacing={16}>
            {nearbyCallouts.map((callout, idx) => {
              const {
                id: calloutId,
                customerName,
                customerId,
                vehicle,
                description,
                location: { coordinate },
                address,
                plan,
                price: fetchedPrice
              } = callout

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
                          secondary={'Relative distance: 0.8km'}
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
                        <span
                          style={{
                            fontWeight: 500
                          }}
                        >
                          Current location:
                        </span>{' '}
                        {address}
                      </Typography>
                      <Typography variant="body1" className={bodyText}>
                        <span
                          style={{
                            fontWeight: 500
                          }}
                        >
                          Vehicle:
                        </span>{' '}
                        {`${vehicle.model} - ${vehicle.plateNumber}`}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={bodyText}
                        style={{
                          marginBottom: 4
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 500
                          }}
                        >
                          Description:
                        </span>
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
                              onClick={() => this.handleDecline()}
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
                        <DialogTitle>Provide quote {calloutId}</DialogTitle>
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
      </Fragment>
    )
  }
}

export default withStyles(styles)(CustomerList)
