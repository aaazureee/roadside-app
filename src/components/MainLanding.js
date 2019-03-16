import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'

const style = theme => ({
  root: {
    flex: 1,
    padding: 16,
    '@media (min-width: 600px)': {
      padding: 24
    },
    background: 'linear-gradient(to left, #4568dc, #b06ab3)',
    color: theme.palette.primary.contrastText,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  titleTextStyle: {
    marginTop: 56,
    '@media (min-width:0px) and (orientation: landscape)': {
      marginTop: 48
    },
    '@media (min-width:600px)': {
      marginTop: 64
    }
  },
  bodyTextStyle: {
    marginTop: 16,
    padding: 5,
    fontSize: 20
  },
  intro: {
    width: '60vw'
  },
  btn: {
    marginTop: 15
  },
  btnText: {
    lineHeight: '46px',
    fontWeight: 600
  }
})

class MainLanding extends Component {
  static defaultProps = {
    titleText: 'Roadside Assistance Service',
    bodyText:
      'Join now to get access to an exciting range of products, services and experiences with 24/7 support.'
  }

  render() {
    const {
      classes: { root, titleTextStyle, bodyTextStyle, intro, btn, btnText },
      titleText,
      bodyText
    } = this.props
    return (
      <div className={root}>
        <div className={intro}>
          <Typography variant="h3" color="inherit" className={titleTextStyle}>
            {titleText}
          </Typography>
          <Typography variant="h3" color="inherit" />
          <Typography variant="body1" color="inherit" className={bodyTextStyle}>
            {bodyText}
          </Typography>
          <Button color="secondary" variant="contained" className={btn}>
            <Typography variant="h6" color="inherit" className={btnText}>
              Learn more
            </Typography>
          </Button>
        </div>
      </div>
    )
  }
}

export default withStyles(style)(MainLanding)
