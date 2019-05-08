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
    fontWeight: 400
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
    marginLeft: 0,
    [theme.breakpoints.up(890)]: {
      flexBasis: '50%'
    }
  }
})
class CustomerList extends Component {
  // TODO post API to get list => map to render
  state = {
    open: false,
    price: ''
  }

  handleDecline = something => {}

  handleAccept = event => {
    event.preventDefault()
  }

  handleOpen = () => {
    this.setState({ open: true })
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

    const { price } = this.state

    return (
      <Fragment>
        <Typography variant="h6" color="primary" gutterBottom>
          Nearby callout request
        </Typography>
        <Fragment>
          <Typography varian="body2">Loading nearby customers...</Typography>
          <Grid container spacing={16}>
            <Grid item className={gridItem}>
              <Paper className={paper}>
                <List disablePadding>
                  <ListItem disableGutters>
                    <ListItemText
                      primary={
                        <div>
                          Hieu Chu •{' '}
                          <span
                            style={{
                              fontWeight: 400,
                              color: 'rgba(0, 0, 0, 0.46)'
                            }}
                          >
                            Basic Customer
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
                    Keira Street, Wollongong
                  </Typography>
                  <Typography variant="body1" className={bodyText}>
                    <span
                      style={{
                        fontWeight: 500
                      }}
                    >
                      Vehicle:
                    </span>{' '}
                    Car model 1 - Car plate 1
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    pretium ipsum dolor, a bibendum tortor malesuada eget.
                    Vivamus tempor vehicula orci, in maximus mi commodo a. Donec
                    tincidunt sed sem eu suscipit.
                  </Typography>
                </Fragment>

                <Grid container justify="flex-end">
                  <Grid item>
                    <Button
                      color="primary"
                      onClick={() => this.handleDecline()}
                    >
                      Decline
                    </Button>
                    <Button color="primary" onClick={this.handleOpen}>
                      Accept
                    </Button>
                  </Grid>
                </Grid>

                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                  classes={{
                    paper: dialogPaper
                  }}
                >
                  <form onSubmit={this.handleAccept}>
                    <DialogTitle id="form-dialog-title">
                      Provide quote
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        To provide service for this customer, please enter your
                        service price.
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
                            <InputAdornment position="start">$</InputAdornment>
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
            <Grid item className={gridItem}>
              <Paper className={paper}>123</Paper>
            </Grid>
            <Grid item className={gridItem}>
              <Paper className={paper}>456</Paper>
            </Grid>
          </Grid>
        </Fragment>
      </Fragment>
    )
  }
}

export default withStyles(styles)(CustomerList)
