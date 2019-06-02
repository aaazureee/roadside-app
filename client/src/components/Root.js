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
    },
    resetUserDetails: () => {
      this.setState(
        state => ({
          ...state,
          userDetails: {}
        }),
        () => {
          localStorage.removeItem('user')
        }
      )
    }
  }

  state = { ...this.initialState }

  async componentDidMount() {
    const { data: result } = await api.get('/auth/login')
    console.log(result)
    if (result.success && !result.suspended) {
      if (result.userType === 'customer') {
        const { data: detailsResult } = await api.get('/customer/details')
        const { data: userDetails } = detailsResult

        console.log('cust', JSON.parse(JSON.stringify(userDetails)))
        // transform data to correct object format
        userDetails.card = { ...userDetails.creditCard }
        let formatCard = {
          ccNumber: userDetails.card.cardNumber,
          ccName: userDetails.card.name,
          ccExp:
            String(userDetails.card.expireMonth) +
            '/' +
            String(userDetails.card.expireYear).slice(2, 4),
          cvv: userDetails.card.ccv
        }
        delete userDetails.creditCard
        userDetails.card = formatCard
        userDetails.vehicleList = userDetails.vehicles.map(vehicle => ({
          id: vehicle.id,
          carModel: vehicle.model,
          carPlate: vehicle.plateNumber,
          make: vehicle.make
        }))
        userDetails.suspended = false
        console.log('iam', userDetails)
        delete userDetails.vehicles
        this.initialState.updateUserDetails(userDetails)
      } else if (result.userType === 'professional') {
        const { data: detailsResult } = await api.get('/professional/details')
        const { data: userDetails } = detailsResult

        console.log('prof data api', JSON.parse(JSON.stringify(userDetails)))
        // transform data
        userDetails.account = {
          bsb: userDetails.bsb,
          accountNumber: userDetails.accountNumber
        }
        userDetails.workingRadius = userDetails.workingRange / 1000

        delete userDetails.workingRange
        delete userDetails.bsb
        delete userDetails.accountNumber
        userDetails.suspended = false
        console.log('after', userDetails)
        this.initialState.updateUserDetails(userDetails)
      } else if (result.userType === 'admin') {
        this.initialState.updateUserDetails(result)
      }
    } else if (result.success && result.suspended) {
      this.initialState.updateUserDetails({
        suspended: true
      })
    } else if (!result.success) {
      this.initialState.resetUserDetails()
    }
  }

  render() {
    const {
      classes: { root },
      resetTheme,
      persistOutlinedBtn
    } = this.props

    console.log('in root', this.state)

    const { suspended } = this.state.userDetails

    return (
      <UserContext.Provider value={this.state}>
        <div className={root}>
          <AppBar />
          {suspended ? (
            <Switch>
              <Route
                render={() => (
                  <NotFound
                    titleText="Your account has been suspended"
                    bodyText="Please contact an admin for more details."
                    btn={false}
                  />
                )}
              />
            </Switch>
          ) : (
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
          )}

          <Footer />
        </div>
      </UserContext.Provider>
    )
  }
}

export default withStyles(style)(withRouter(Root))
