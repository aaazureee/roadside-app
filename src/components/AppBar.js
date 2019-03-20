import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Button } from '@material-ui/core'
import MuiLink from './MuiLink'
import { NavLink } from 'react-router-dom'

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
  }
})

const StyledAppBar = props => {
  const {
    classes: {
      rightSide,
      linkColor,
      linkMargin,
      appBar,
      activeLink,
      rightLinkMargin
    }
  } = props

  return (
    <React.Fragment>
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
          <div className={rightSide}>
            <MuiLink
              type={NavLink}
              to="/login"
              variant="h6"
              underline="none"
              className={classNames(linkColor, rightLinkMargin)}
              activeClassName={activeLink}
            >
              Login
            </MuiLink>
          </div>
          <Button variant="outlined" color="inherit">
            <MuiLink
              type={NavLink}
              to="/signup"
              variant="h6"
              underline="none"
              color="inherit"
            >
              Sign up free
            </MuiLink>
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default withStyles(styles)(StyledAppBar)
