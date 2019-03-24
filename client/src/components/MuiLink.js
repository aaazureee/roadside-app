import React from 'react'
import { Link } from '@material-ui/core'

class MuiLink extends React.Component {
  renderLink = Component => itemProps => (
    <Component to={this.props.to} {...itemProps} />
  )

  render() {
    const { type } = this.props
    const linkProps = { ...this.props }
    delete linkProps.type
    return (
      <Link component={this.renderLink(type)} {...linkProps}>
        {this.props.children}
      </Link>
    )
  }
}

export default MuiLink
