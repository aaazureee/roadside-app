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
  Button
} from '@material-ui/core'

import { Person } from '@material-ui/icons'
import { grey } from '@material-ui/core/colors'
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
  },
  gridItem: {
    minWidth: 370,
    width: '100%',
    marginLeft: 0,
    [theme.breakpoints.up(957)]: {
      flexBasis: '50%'
    }
  },
  span: {
    fontWeight: 500
  }
})
class ResponseList extends Component {
  state = {
    isLoading: true
  }

  async componentDidMount() {
    const { data: result } = await api.get('/callout/customer')
    if (result.success) {
      const { acceptedProfessionals } = result.data
      this.setState({
        acceptedProfessionals,
        isLoading: false
      })
    } else {
      alert(result.error)
    }
  }

  handleAccept = async professionalId => {
    console.log('accepting', professionalId)
    const { data: result } = await api.post('/callout/customer/choose', {
      id: professionalId
    })
    if (result.success) {
      const { handleInnerChange } = this.props
      handleInnerChange({
        confirmProfessional: this.state.acceptedProfessionals.find(
          prof => prof.professionalId === professionalId
        )
      })
    } else {
      alert(result.error)
    }
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
        gridItem,
        span
      }
    } = this.props

    const { acceptedProfessionals, isLoading } = this.state

    if (isLoading) {
      return <Typography variant="body2">Loading...</Typography>
    }

    if (!acceptedProfessionals || !acceptedProfessionals.length) {
      return (
        <Typography
          variant="body2"
          style={{
            fontSize: '1rem'
          }}
        >
          {`Please refresh the page to see new nearby professionals' responses.`}
        </Typography>
      )
    }

    return (
      <Fragment>
        <Typography variant="h6" color="primary" gutterBottom>
          Available Professionals
        </Typography>
        <Grid container spacing={16}>
          {acceptedProfessionals.map(prof => {
            const {
              professionalId,
              fullName,
              price,
              address,
              location: { coordinates }
            } = prof

            return (
              <Grid item className={gridItem} key={professionalId}>
                <Paper className={paper}>
                  <List disablePadding>
                    <ListItem disableGutters>
                      <ListItemText
                        primary={
                          <div>
                            {fullName} •{' '}
                            <span
                              style={{
                                fontWeight: 400,
                                color: 'rgba(0, 0, 0, 0.60)'
                              }}
                            >
                              Roadside Professional
                            </span>
                          </div>
                        }
                        // secondary={'Driving distance: 0.8km'}
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
                    <Typography variant="body1" className={bodyText}>
                      <span className={span}>Pricing:</span> ${price}
                    </Typography>
                  </Fragment>

                  <Grid container justify="flex-end">
                    <Grid item>
                      <Button
                        color="primary"
                        onClick={() => this.handleAccept(professionalId)}
                      >
                        Accept
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Fragment>
    )
  }
}

export default withStyles(styles)(ResponseList)
