import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppBar from './AppBar'
import Footer from './Footer'
import MainLanding from './MainLanding'
import SignUp from './SignUp'
import LogIn from './LogIn'
import Pricing from './Pricing'
import Career from './Career'
import NotFound from './NotFound'

const style = theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
  }
})

const Root = props => {
  const {
    classes: { root },
    resetTheme,
    persistOutlinedBtn
  } = props
  return (
    <Router>
      <div className={root}>
        <AppBar />
        <Switch>
          <Route exact path="/" component={MainLanding} />
          <Route
            path="/signup"
            render={() => (
              <SignUp
                resetTheme={resetTheme}
                persistOutlinedBtn={persistOutlinedBtn}
              />
            )}
          />
          <Route path="/login" component={LogIn} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/careers" component={Career} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default withStyles(style)(Root)
