import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MuiLink from '../MuiLink'
import { NavLink } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Popper,
  Fade,
  ClickAwayListener,
  Paper,
  MenuList,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'

const styles = theme => ({
  rightSide: {
    marginLeft: 'auto'
  },
  linkColor: {
    color: theme.palette.primary.contrastText,
    '&:hover': {
      color: theme.palette.secondary.light,
      transition: theme.transitions.create(['color'])
    }
  },
  linkMargin: {
    marginRight: theme.spacing.unit * 3
  },
  rightLinkMargin: {
    marginRight: theme.spacing.unit * 2
  },
  activeLink: {
    color: theme.palette.secondary.light
  },
  appBar: {
    zIndex: 999,
    background: 'linear-gradient(to right, #8e2de2, #4a00e0)',
    boxShadow:
      '0px 0px 4px -1px rgba(0,0,0,0.2), 0px 0px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
  },
  accountIcon: {
    fontSize: 30
  },
  primaryText: {
    color: 'black',
    fontWeight: 500
  },
  secondaryText: {
    color: 'black',
    fontWeight: 400
  },
  nonHover: {
    cursor: 'pointer',
    '&:focus': {
      outline: 'none'
    }
  }
})

class StyledAppBar extends Component {
  state = {
    open: false
  }

  handleToggle = () => {
    this.setState(state => ({
      open: !state.open
    }))
  }

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return
    }

    this.setState({ open: false })
  }

  handleLogout = event => {
    this.handleClose(event)
    localStorage.removeItem('user')
    this.props.user.reset()
  }

  render() {
    const {
      classes: {
        rightSide,
        linkColor,
        linkMargin,
        appBar,
        activeLink,
        rightLinkMargin,
        accountIcon,
        primaryText,
        secondaryText,
        nonHover
      }
    } = this.props

    const { email, firstName, lastName } = this.props.user.userDetails

    const { open } = this.state

    console.log('App bar', this.props)
    console.log('abc', this.state.open)

    return (
      <Fragment>
        <AppBar position="fixed" className={appBar}>
          <Toolbar>
            <MuiLink
              type={NavLink}
              exact
              to="/"
              variant="h6"
              underline="none"
              className={classNames(linkColor, linkMargin)}
              activeClassName={activeLink}
            >
              Home
            </MuiLink>
            <MuiLink
              type={NavLink}
              to="/pricing"
              variant="h6"
              underline="none"
              className={classNames(linkColor, linkMargin)}
              activeClassName={activeLink}
            >
              Pricing
            </MuiLink>
            <MuiLink
              type={NavLink}
              to="/careers"
              variant="h6"
              underline="none"
              className={classNames(linkColor, linkMargin)}
              activeClassName={activeLink}
            >
              Careers
            </MuiLink>

            {/* Check if there is an authenticated user */}
            {email ? (
              <Fragment>
                <div
                  className={rightSide}
                  style={{
                    alignSelf: 'center'
                  }}
                >
                  <IconButton
                    color="inherit"
                    style={{
                      marginRight: -12
                    }}
                    buttonRef={node => (this.anchorEl = node)}
                    aria-owns={open ? 'menu-list' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleToggle}
                  >
                    <AccountCircle className={accountIcon} />
                  </IconButton>
                  <Popper
                    open={open}
                    anchorEl={this.anchorEl}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps}>
                        <Paper
                          style={{
                            marginTop: -12
                          }}
                        >
                          <ClickAwayListener onClickAway={this.handleClose}>
                            <MenuList>
                              <MenuItem className={nonHover} button={false}>
                                <List>
                                  <ListItem disableGutters>
                                    <ListItemIcon
                                      style={{
                                        marginRight: 0,
                                        color: 'rgba(0, 0, 0, 0.9)'
                                      }}
                                    >
                                      <AccountCircle className={accountIcon} />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={`${firstName} ${lastName}`}
                                      secondary={email}
                                      classes={{
                                        primary: primaryText,
                                        secondary: secondaryText
                                      }}
                                    />
                                  </ListItem>
                                </List>
                              </MenuItem>
                              <Divider
                                style={{
                                  marginTop: 8,
                                  marginBottom: 4
                                }}
                              />
                              <MenuItem>Profile</MenuItem>
                              <MenuItem onClick={this.handleLogout}>
                                Sign out
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <MuiLink
                  type={NavLink}
                  to="/login"
                  variant="h6"
                  underline="none"
                  className={classNames(rightSide, linkColor, rightLinkMargin)}
                  activeClassName={activeLink}
                >
                  Login
                </MuiLink>
                <MuiLink
                  type={NavLink}
                  to="/signup"
                  underline="none"
                  color="inherit"
                >
                  <Button variant="outlined" color="inherit">
                    <Typography variant="h6" color="inherit">
                      Sign up free
                    </Typography>
                  </Button>
                </MuiLink>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </Fragment>
    )
  }
}

export default withStyles(styles)(StyledAppBar)
