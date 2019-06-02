import React, { Component } from 'react'
import MainLanding from './MainLanding'

class NotFound extends Component {
  static defaultProps = {
    titleText: `Well, that didn't go as planned...`,
    bodyText: `Sorry, we can't find the page you're looking for.`,
    btn: false
  }

  render() {
    const { titleText, bodyText, btn } = this.props
    return (
      <MainLanding titleText={titleText} bodyText={bodyText} showButton={btn} />
    )
  }
}

export default NotFound
