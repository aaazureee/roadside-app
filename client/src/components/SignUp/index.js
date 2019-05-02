import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Paper, Stepper, Step, StepLabel } from '@material-ui/core'
import BasicForm from './BasicForm'
import CustomerVehicleForm from './CustomerVehicleForm'
import PaymentForm from './PaymentForm'
import SignUpReview from './SignUpReview'
import AccountForm from './AccountForm'
import WorkForm from './WorkForm'

const style = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  paper: {
    padding: theme.spacing.unit * 2,
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
    if (this.props.userType === 'customer') {
      this.props.persistOutlinedBtn()
      this.updateUserDetails({ plan: 'basic' })
    }
  }

  state = {
    activeStep: 0,
    userDetails: {
      userType: this.props.userType
    },
    steps:
      this.props.userType === 'customer'
        ? steps
        : steps.map((step, index) => {
            if (step === 'Vehicle details') return 'Work details'
            return step
          })
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

  getStepperOptions = () => ({
    handleNext: this.handleNext,
    handleBack: this.handleBack,
    updateUserDetails: this.updateUserDetails,
    userType: this.props.userType,
    userDetails: this.state.userDetails
  })

  getStepContent = step => {
    const { userType } = this.props
    switch (step) {
      case 0:
        return <BasicForm {...this.getStepperOptions()} />
      case 1:
        if (userType === 'customer') {
          return <CustomerVehicleForm {...this.getStepperOptions()} />
        }
        return <WorkForm {...this.getStepperOptions()} />

      case 2:
        if (userType === 'customer') {
          return <PaymentForm {...this.getStepperOptions()} />
        }
        return <AccountForm {...this.getStepperOptions()} />

      case 3:
        return (
          <SignUpReview
            {...this.getStepperOptions()}
            userDetails={this.state.userDetails}
            history={this.props.history}
          />
        )
      default:
        throw new Error('Unknown step')
    }
  }

  render() {
    const {
      classes: { root, paper },
      userType
    } = this.props

    const { activeStep, steps } = this.state

    return (
      <main className={classNames('mainContent', root)}>
        <Paper className={paper}>
          <Typography variant="h5" color="primary" align="center">
            Sign up as {userType}
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Fragment>
            {activeStep === steps.length ? (
              <Fragment>
                <Typography variant="h5" gutterBottom>
                  Your registration is successful.
                </Typography>
                <Typography variant="subtitle1">
                  We will now redirect you to the dashboard.
                </Typography>
              </Fragment>
            ) : (
              <Fragment>
                {activeStep !== steps.length - 1 &&
                  steps[activeStep] !== 'Work details' && (
                    <Typography variant="h6" color="primary" gutterBottom>
                      {steps[activeStep]}
                    </Typography>
                  )}
                {this.getStepContent(activeStep)}
              </Fragment>
            )}
          </Fragment>
        </Paper>
      </main>
    )
  }

  componentWillUnmount() {
    this.props.userType === 'customer' && this.props.resetTheme()
  }
}

export default withStyles(style)(SignUp)
