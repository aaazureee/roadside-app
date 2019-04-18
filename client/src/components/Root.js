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
import Career from './Career'

const style = theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
  }
})

class Root extends Component {
  initialState = {
    userDetails: { ...JSON.parse(localStorage.getItem('user')) },
    updateUserDetails: newUserDetails => {
      this.setState(state => ({
        ...state,
        userDetails: {
          ...state.userDetails,
          ...newUserDetails
        }
      }))
    },
    reset: () => {
      this.setState(state => ({
        ...state,
        userDetails: {}
      }))
    }
  }

  state = { ...this.initialState }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.location.pathname !== this.props.location.pathname) {
  //     // console.log('did update')
  //     this.setState({
  //       userEmail: localStorage.getItem('userEmail')
  //     })
  //     // console.log(this.props)
  //   }
  // }

  render() {
    const {
      classes: { root },
      resetTheme,
      persistOutlinedBtn
    } = this.props

    console.log('in root', this.state)
    return (
      <div className={root}>
        <AppBar user={this.state} />
        <Switch>
          <Route exact path="/" component={MainLanding} />
          <Route
            path="/signup"
            render={props => (
              <SignUp
                resetTheme={resetTheme}
                persistOutlinedBtn={persistOutlinedBtn}
                user={this.state}
                userType="customer"
                {...props}
              />
            )}
          />
          <Route path="/login" component={Login} />
          <Route path="/pricing" component={Pricing} />
          <Route
            path="/careers"
            render={props => (
              <Career user={this.state} userType="professional" {...props} />
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
