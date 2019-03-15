import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button, Link } from '@material-ui/core'

const styles = theme => ({
  rightSide: {
    marginLeft: 'auto',
    marginRight: '0.5rem'
  },
  link: {
    color: theme.palette.primary.contrastText,
    '&:hover': {
      color: theme.palette.secondary.light
    },
    marginRight: '1.5rem'
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
    classes: { rightSide, link, appBar }
  } = props
  return (
    <div>
      <AppBar position="fixed" className={appBar}>
        <Toolbar>
          <Typography>
            <Link href="#" variant="h6" underline="none" className={link}>
              Home
            </Link>
          </Typography>
          <Typography>
            <Link href="#" variant="h6" underline="none" className={link}>
              Pricing
            </Link>
          </Typography>
          <Typography>
            <Link href="#" variant="h6" underline="none" className={link}>
              Careers
            </Link>
          </Typography>
          <Button color="inherit" className={rightSide}>
            <Typography variant="h6" color="inherit">
              Login
            </Typography>
          </Button>
          <Button variant="outlined" color="inherit">
            <Typography variant="h6" color="inherit">
              Sign up free
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(StyledAppBar)
