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
import Profile from './Profile'
import Dashboard from './Dashboard'
import { UserContext } from './Context'
import api from './api'

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
      this.setState(
        state => ({
          ...state,
          userDetails: {
            ...state.userDetails,
            ...newUserDetails
          }
        }),
        () => {
          localStorage.setItem(
            'user',
            JSON.stringify({ ...this.state.userDetails, ...newUserDetails })
          )
        }
      )
    }
  }

  state = { ...this.initialState }

  componentDidMount() {
    // api
    //   .get('/ping')
    //   .then(res => {
    //     console.log(res.data)
    //   })
    //   .catch(err => console.log(err))
  }

  render() {
    const {
      classes: { root },
      resetTheme,
      persistOutlinedBtn
    } = this.props

    console.log('in root', this.state)
    return (
      <UserContext.Provider value={this.state}>
        <div className={root}>
          <AppBar />
          <Switch>
            <Route exact path="/" component={MainLanding} />
            <Route
              path="/signup"
              render={props => (
                <SignUp
                  resetTheme={resetTheme}
                  persistOutlinedBtn={persistOutlinedBtn}
                  userType="customer"
                  {...props}
                />
              )}
            />
            <Route
              path="/careers"
              render={props => <Career userType="professional" {...props} />}
            />
            <Route path="/login" component={Login} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/profile" component={Profile} />
            <Route path="/dashboard" component={Dashboard} />

            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </UserContext.Provider>
    )
  }
}

export default withStyles(style)(withRouter(Root))
