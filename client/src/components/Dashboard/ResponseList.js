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
  DialogActions
} from '@material-ui/core'
import moment from 'moment'
import { Person } from '@material-ui/icons'
import { grey } from '@material-ui/core/colors'
import api from '../api'
import { UserContext } from '../Context'
import { calcDistance } from './utils'
import { ReactComponent as StarBorder } from '../../svg/star-border.svg'
import { ReactComponent as Star } from '../../svg/star.svg'
import axios from 'axios'

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
  span: {
    fontWeight: 500
  },
  dialogPaper: {
    width: 500
  },
  star: {
    width: 20,
    verticalAlign: -2
  }
})
class ResponseList extends Component {
  static contextType = UserContext
  state = {
    isLoading: true,
    modalOpen: false,
    currentProf: {},
    sampleList: [],
    isReviewLoading: true
  }

  async componentDidMount() {
    const { data: result } = await api.get('/callout/customer')
    if (result.success) {
      const {
        acceptedProfessionals,
        location: { coordinates }
      } = result.data

      this.setState({
        acceptedProfessionals,
        myLat: coordinates[1],
        myLng: coordinates[0],
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

  handleClose = () => {
    this.setState({
      modalOpen: false,
      isReviewLoading: true
    })
  }

  handleOpen = async selectedProf => {
    this.setState(
      {
        modalOpen: true,
        currentProf: selectedProf
      },
      async () => {
        const { data: result } = await api.get(
          `/professional/info/${this.state.currentProf.professionalId}`
        )
        if (result.success) {
          this.setState({
            sampleList: result.data.reviews,
            isReviewLoading: false
          })
        } else {
          alert(result.error)
        }
      }
    )
  }

  renderStars = (starCount, starStyle) => {
    const stars = [1, 2, 3, 4, 5]

    return stars.map(star => {
      if (star > starCount) {
        return <StarBorder key={`star-${star}`} className={starStyle} />
      } else {
        return (
          <Star
            key={`star-${star}`}
            className={starStyle}
            style={{
              fill: '#8E2DE2'
            }}
          />
        )
      }
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
        gridItem,
        span,
        dialogPaper,
        star: starStyle
      }
    } = this.props

    const {
      acceptedProfessionals,
      isLoading,
      sampleList,
      isReviewLoading
    } = this.state

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

    // let testList = acceptedProfessionals
    // for (let i = 0; i <= 7; i++) {
    //   testList = testList.concat(testList)
    //   console.log('length', testList.length)
    // }
    const { plan } = this.context.userDetails

    return (
      <Fragment>
        <Typography variant="h6" color="primary" gutterBottom>
          Available Professionals
        </Typography>
        <Grid
          container
          spacing={16}
          style={{
            width: 500
          }}
        >
          {acceptedProfessionals.map(prof => {
            const {
              professionalId,
              fullName,
              price,
              address,
              location: { coordinates }
            } = prof

            // professional location
            const profLat = coordinates[1]
            const profLng = coordinates[0]

            return (
              <Grid
                item
                style={{
                  width: 500
                }}
                key={professionalId}
              >
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
                        secondary={`Relative distance: ${calcDistance(
                          this.state.myLat,
                          this.state.myLng,
                          profLat,
                          profLng
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
                    <Typography variant="body1" className={bodyText}>
                      <span className={span}>Pricing:</span> ${price}
                      {plan === 'premium' && ' (Free)'}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="primary"
                      style={{
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        display: 'inline-block'
                      }}
                      onClick={() => this.handleOpen(prof)}
                    >
                      View ratings and reviews
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
                <Dialog
                  open={this.state.modalOpen}
                  onClose={this.handleClose}
                  classes={{
                    paper: dialogPaper
                  }}
                >
                  <Fragment>
                    <DialogTitle color="primary">
                      {`Ratings and Reviews for ${
                        this.state.currentProf.fullName
                      }`}
                    </DialogTitle>
                    <DialogContent>
                      {isReviewLoading ? (
                        <Typography variant="body2">Loading...</Typography>
                      ) : (
                        <Grid container spacing={16}>
                          {sampleList.map((item, index) => {
                            const { fullName, rating, comment, date } = item

                            return (
                              <Grid
                                item
                                style={{
                                  width: 500
                                }}
                                key={index}
                              >
                                <Paper className={paper}>
                                  <List disablePadding>
                                    <ListItem disableGutters>
                                      <ListItemText
                                        primary={
                                          <div>
                                            {fullName} •{' '}
                                            {this.renderStars(
                                              rating,
                                              starStyle
                                            )}
                                          </div>
                                        }
                                        secondary={moment(date).format(
                                          'DD/MM/YYYY, H:mm A'
                                        )}
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
                                    <Typography
                                      variant="body1"
                                      className={bodyText}
                                    >
                                      {comment}
                                      {!comment && (
                                        <span
                                          style={{
                                            color: 'rgba(0,0,0,0.5)',
                                            fontStyle: 'italic'
                                          }}
                                        >
                                          No review provided
                                        </span>
                                      )}
                                    </Typography>
                                  </Fragment>
                                </Paper>
                              </Grid>
                            )
                          })}
                        </Grid>
                      )}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} color="primary">
                        Close
                      </Button>
                    </DialogActions>
                  </Fragment>
                </Dialog>
              </Grid>
            )
          })}
        </Grid>
      </Fragment>
    )
  }
}

export default withStyles(styles)(ResponseList)
