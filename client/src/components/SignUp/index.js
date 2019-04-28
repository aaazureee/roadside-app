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
import { UserContext } from '../Context'

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
    this.props.userType === 'customer' && this.props.persistOutlinedBtn()
  }

  state = {
    activeStep: 0,
    userDetails: {
      userType: this.props.userType,
      plan: 'basic'
    },
    steps:
      this.props.userType === 'customer'
        ? steps
        : steps.map((step, index) => {
            if (step === 'Vehicle details') return 'Work details'
            return step
          })
  }

  static contextType = UserContext

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
    updateUserDetails: this.updateUserDetails,
    userType: this.props.userType
  }

  getStepContent = step => {
    const { userType } = this.props
    switch (step) {
      case 0:
        return <BasicForm {...this.stepperOptions} />
      case 1:
        if (userType === 'customer') {
          return <CustomerVehicleForm {...this.stepperOptions} />
        }
        return <WorkForm {...this.stepperOptions} />

      case 2:
        if (userType === 'customer') {
          return <PaymentForm {...this.stepperOptions} />
        }
        return <AccountForm {...this.stepperOptions} />

      case 3:
        return (
          <SignUpReview
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
      history,
      userType
    } = this.props

    const user = this.context
    const { activeStep, steps, userDetails } = this.state

    const redirectUser = () => {
      setTimeout(function() {
        localStorage.setItem('user', JSON.stringify(userDetails))
        user.updateUserDetails(userDetails) // update root user
        history.push('/')
      }, 1000)
    }

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
                {redirectUser()}
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
