import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MuiLink from '../MuiLink'
import { NavLink, Link } from 'react-router-dom'
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
  Divider,
  Avatar
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { Person, CreditCard } from '@material-ui/icons'
import { UserContext } from '../Context'

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
  avatar: {
    color: grey[200],
    background: '#AA47BC',
    width: 32,
    height: 32
  },
  accountIcon: {
    fontSize: 28
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
  },
  planText: {
    fontWeight: 400,
    fontSize: '1rem'
  },
  basicPlan: {
    color: theme.palette.primary.main
  },
  premiumPlan: {
    color: theme.palette.secondary.main
  },
  routerLink: {
    display: 'block',
    textDecoration: 'none'
  },
  divider: {
    marginTop: 8,
    marginBottom: 4,
    // background: 'red',
    height: '0.05rem'
  }
})

class StyledAppBar extends Component {
  state = {
    open: false
  }

  static contextType = UserContext

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
    setTimeout(() => {
      localStorage.removeItem('user')
      window.location.reload()
    }, 500)
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
        nonHover,
        avatar,
        planText,
        basicPlan,
        premiumPlan,
        routerLink,
        divider
      }
    } = this.props

    const user = this.context
    const { email, firstName, lastName, plan, userType } = user.userDetails

    const { open } = this.state

    return (
      <Fragment>
        <AppBar position="fixed" className={appBar}>
          <Toolbar>
            {email && (
              <MuiLink
                type={NavLink}
                to="/dashboard"
                variant="h6"
                underline="none"
                className={classNames(linkColor, linkMargin)}
                activeClassName={activeLink}
              >
                Dashboard
              </MuiLink>
            )}
            {!email && (
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
            )}

            {(!email || userType === 'customer') && (
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
            )}

            {!email && (
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
            )}

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
                    <Avatar className={avatar}>
                      <Person className={accountIcon} />
                    </Avatar>
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
                            marginTop: -8
                          }}
                        >
                          <ClickAwayListener onClickAway={this.handleClose}>
                            <MenuList>
                              <Link to="/profile" className={routerLink}>
                                <MenuItem
                                  className={nonHover}
                                  button={false}
                                  onClick={this.handleClose}
                                >
                                  <List>
                                    <ListItem disableGutters>
                                      <ListItemIcon
                                        style={{
                                          marginRight: 0
                                        }}
                                      >
                                        <Avatar className={avatar}>
                                          <Person className={accountIcon} />
                                        </Avatar>
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
                              </Link>
                              <Divider className={divider} />

                              {userType === 'customer' && (
                                <div>
                                  <Link to="/pricing" className={routerLink}>
                                    <MenuItem
                                      className={nonHover}
                                      button={false}
                                      onClick={this.handleClose}
                                    >
                                      <List>
                                        <ListItem disableGutters>
                                          <ListItemIcon
                                            style={{
                                              marginRight: 0
                                            }}
                                          >
                                            <CreditCard
                                              className={classNames({
                                                [basicPlan]: plan === 'basic',
                                                [premiumPlan]:
                                                  plan === 'premium'
                                              })}
                                            />
                                          </ListItemIcon>
                                          <ListItemText
                                            primary={
                                              plan === 'basic'
                                                ? 'Basic Plan'
                                                : 'Premium Plan'
                                            }
                                            classes={{
                                              primary: classNames(planText)
                                            }}
                                          />
                                        </ListItem>
                                      </List>
                                    </MenuItem>
                                  </Link>
                                  <Divider className={divider} />
                                </div>
                              )}

                              <Link to="/profile" className={routerLink}>
                                <MenuItem onClick={this.handleClose}>
                                  Profile
                                </MenuItem>
                              </Link>

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
