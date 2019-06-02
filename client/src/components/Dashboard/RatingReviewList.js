import React, { Component, Fragment } from 'react'
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { UserContext } from '../Context'
import { grey } from '@material-ui/core/colors'
import { Person } from '@material-ui/icons'
import moment from 'moment'
import { ReactComponent as StarBorder } from '../../svg/star-border.svg'
import { ReactComponent as Star } from '../../svg/star.svg'
import api from '../api'

const styles = theme => ({
  paper: {
    marginTop: 8,
    padding: 12,
    paddingTop: 4
  },
  primaryText: {
    fontWeight: 500
  },
  secondaryText: {
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.60)'
  },
  bodyText: {
    fontWeight: 400,
    marginBottom: 8,
    fontSize: '0.95rem'
  },
  avatar: {
    color: grey[200],
    background: theme.palette.primary.main,
    width: 40,
    height: 40
  },
  accountIcon: {
    fontSize: 32
  },
  star: {
    width: 20,
    verticalAlign: -2
  }
})

class RatingReviewList extends Component {
  static contextType = UserContext

  state = {
    isLoading: true
  }

  async componentDidMount() {
    const { userId } = this.context.userDetails
    const { data: result } = await api.get(`/professional/info/${userId}`)

    if (result.success) {
      console.log(result)
      this.setState({
        isLoading: false,
        sampleList: result.data.reviews
      })
    } else {
      alert(result.error)
    }
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
    // let sampleList = [
    //   {
    //     custName: 'customer 1',
    //     rating: 4,
    //     review: 'something good',
    //     date: '20/05/2019, 8:40PM'
    //   },
    //   {
    //     custName: 'customer 2',
    //     rating: 3,
    //     review: '',
    //     date: '10/05/2019, 5:40PM'
    //   },
    //   {
    //     custName: 'customer 3',
    //     rating: 2,
    //     review: 'hello world',
    //     date: '08/05/2019, 9:30AM'
    //   }
    // ]
    const { isLoading, sampleList } = this.state

    const {
      classes: {
        paper,
        primaryText,
        secondaryText,
        bodyText,
        avatar,
        accountIcon,
        star: starStyle
      }
    } = this.props

    if (isLoading) return <Typography variant="body2">Loading...</Typography>

    return (
      <Fragment>
        <Typography variant="h6" color="primary" gutterBottom>
          Ratings and Reviews
        </Typography>
        <Grid
          container
          spacing={16}
          style={{
            width: 500
          }}
        >
          {!sampleList.length && (
            <Grid item>
              <Typography variant="body2">
                There are currently no ratings and reviews available.
              </Typography>
            </Grid>
          )}
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
                            {fullName} • {this.renderStars(rating, starStyle)}
                          </div>
                        }
                        secondary={moment(date).format('DD/MM/YYYY, H:mm A')}
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
      </Fragment>
    )
  }
}

export default withStyles(styles)(RatingReviewList)
