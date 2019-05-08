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
  Button
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
  gridItem: {
    minWidth: 400,
    width: '100%',
    marginLeft: 0,
    [theme.breakpoints.up(890)]: {
      flexBasis: '50%'
    }
  }
})
class ResponseList extends Component {
  // TODO post API to get list => map to render
  // TODO handle onChange accept
  state = {}

  handleAccept = professionalId => {}

  render() {
    const {
      classes: {
        avatar,
        accountIcon,
        primaryText,
        secondaryText,
        bodyText,
        paper,
        gridItem
      }
    } = this.props

    return (
      <Fragment>
        <Typography variant="h6" color="primary" gutterBottom>
          Available Professionals
        </Typography>
        <Fragment>
          <Typography varian="body2">Waiting for responses...</Typography>
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
                            Roadside Professional
                          </span>
                        </div>
                      }
                      secondary={'Rating: 4.5 stars'}
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
                    <span
                      style={{
                        fontWeight: 500
                      }}
                    >
                      Relative distance:
                    </span>{' '}
                    0.8km
                  </Typography>
                  <Typography variant="body1" className={bodyText}>
                    <span
                      style={{
                        fontWeight: 500
                      }}
                    >
                      Pricing:
                    </span>{' '}
                    $15
                  </Typography>
                </Fragment>

                <Grid container justify="flex-end">
                  <Grid item>
                    <Button
                      color="primary"
                      onClick={() => this.handleAccept('professionalId')}
                    >
                      Accept
                    </Button>
                  </Grid>
                </Grid>
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

export default withStyles(styles)(ResponseList)
