import React, { Component } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Paper, Stepper, Step, StepLabel } from '@material-ui/core'
import CustomerBasicForm from './CustomerBasicForm'
import CustomerVehicleForm from './CustomerVehicleForm'
import CustomerPaymentForm from './CustomerPaymentForm'
import CustomerReview from './CustomerReview'

const style = theme => ({
  root: {
    background: '#fff',
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      padding: theme.spacing.unit * 3,
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }
})

const steps = ['Basic details', 'Vehicle details', 'Payment details', 'Review']

class SignUp extends Component {
  componentDidMount() {
    this.props.persistOutlinedBtn()
  }

  state = {
    activeStep: 0,
    userDetails: {
      userType: 'customer'
    }
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }))
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }))
  }

  updateUserDetails = newUserDetails => {
    this.setState(state => ({
      ...state,
      userDetails: {
        ...state.userDetails,
        ...newUserDetails
      }
    }))
  }

  stepperOptions = {
    handleNext: this.handleNext,
    handleBack: this.handleBack,
    updateUserDetails: this.updateUserDetails
  }

  getStepContent = step => {
    switch (step) {
      case 0:
        return <CustomerBasicForm {...this.stepperOptions} />
      case 1:
        return <CustomerVehicleForm {...this.stepperOptions} />
      case 2:
        return <CustomerPaymentForm {...this.stepperOptions} />
      case 3:
        return (
          <CustomerReview
            {...this.stepperOptions}
            userDetails={this.state.userDetails}
          />
        )
      default:
        throw new Error('Unknown step')
    }
  }

  render() {
    const {
      classes: { root, paper },
      history
    } = this.props

    const { activeStep } = this.state

    return (
      <main className={classNames('mainContent', root)}>
        <Paper className={paper}>
          <Typography variant="h5" color="primary" align="center">
            Sign up as customer
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Your registration is successful.
                </Typography>
                <Typography variant="subtitle1">
                  We will now redirect you to the dashboard.
                  {setTimeout(() => {
                    localStorage.setItem(
                      'userEmail',
                      this.state.userDetails.email
                    )
                    history.push('/')
                  }, 500)}
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography variant="h6" gutterBottom>
                  {steps[activeStep]}
                </Typography>
                {this.getStepContent(activeStep)}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    )
  }

  componentWillUnmount() {
    this.props.resetTheme()
  }
}

export default withStyles(style)(SignUp)
