import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Route, Switch, withRouter } from 'react-router-dom'
import AppBar from './AppBar'
import Footer from './Footer'
import MainLanding from './MainLanding'
import SignUp from './SignUp'
import Login from './Login'
import Pricing from './Pricing'
import NotFound from './NotFound'

const style = theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
  }
})

class Root extends Component {
  state = {
    userEmail: localStorage.getItem('userEmail')
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      // console.log('did update')
      this.setState({
        userEmail: localStorage.getItem('userEmail')
      })
      // console.log(this.props)
    }
  }

  render() {
    // console.log('render')
    const {
      classes: { root },
      resetTheme,
      persistOutlinedBtn
    } = this.props
    const { userEmail } = this.state
    return (
      <div className={root}>
        <AppBar userEmail={userEmail} />
        <Switch>
          <Route exact path="/" component={MainLanding} />
          <Route
            path="/signup"
            render={props => (
              <SignUp
                resetTheme={resetTheme}
                persistOutlinedBtn={persistOutlinedBtn}
                userEmail={userEmail}
                userType="customer"
                {...props}
              />
            )}
          />
          <Route path="/login" component={Login} />
          <Route path="/pricing" component={Pricing} />
          <Route
            path="/careers"
            render={() => (
              <SignUp userEmail={userEmail} userType="professional" />
            )}
          />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default withStyles(style)(withRouter(Root))
