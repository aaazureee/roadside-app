import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import MuiLink from './MuiLink'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { UserContext } from './Context'

const style = theme => ({
  root: {
    background: 'linear-gradient(to left, #4568dc, #b06ab3)',
    color: theme.palette.primary.contrastText,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  bodyTextStyle: {
    marginTop: theme.spacing.unit * 2,
    padding: 5,
    fontSize: '1.25rem'
  },
  intro: {
    width: '60vw'
  },
  btn: {
    marginTop: theme.spacing.unit * 2,
    padding: `0px ${theme.spacing.unit * 4}px`,
    borderRadius: theme.spacing.unit * 3,
    boxShadow: 'none'
  },
  btnText: {
    lineHeight: '46px',
    fontWeight: 600
  }
})

class MainLanding extends Component {
  static contextType = UserContext

  static defaultProps = {
    titleText: 'Roadside Assistance Service',
    bodyText:
      'Join now to get access to an exciting range of products, services and experiences with 24/7 support.',
    showButton: true
  }

  render() {
    const {
      classes: { root, bodyTextStyle, intro, btn, btnText },
      titleText,
      bodyText,
      showButton
    } = this.props

    const { userType } = this.context.userDetails

    return (
      <main className={classNames('mainContent', root)}>
        <div className={intro}>
          <Typography
            variant="h3"
            color="inherit"
            style={{
              display: 'inline-block',
              width: 700
            }}
          >
            {titleText}
          </Typography>
          <Typography
            variant="body1"
            color="inherit"
            className={bodyTextStyle}
            style={{
              display: 'block',
              width: 700
            }}
          >
            {bodyText}
          </Typography>
          {(!userType || userType === 'customer') && showButton && (
            <MuiLink type={Link} to="/pricing" underline="none">
              <Button color="secondary" variant="contained" className={btn}>
                <Typography variant="h6" color="inherit" className={btnText}>
                  Learn more
                </Typography>
              </Button>
            </MuiLink>
          )}
        </div>
      </main>
    )
  }
}

export default withStyles(style)(MainLanding)
