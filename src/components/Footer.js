import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const style = theme => ({
  root: {
    background: '#09181E',
    padding: '16px 16px',
    '@media (min-width: 600px)': {
      padding: '16px 24px'
    }
  },
  footerText: {
    color: '#576d7b',
    fontWeight: 400
  }
})

const Footer = props => {
  const {
    classes: { root, footerText }
  } = props
  return (
    <div className={root}>
      <Typography variant="body1" className={footerText}>
        © 2019 UOW, all rights reserved
      </Typography>
    </div>
  )
}

export default withStyles(style)(Footer)
