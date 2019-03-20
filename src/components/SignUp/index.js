import React, { Component } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Paper, Stepper, Step, StepLabel } from '@material-ui/core'
import CustomerBasicForm from './CustomerBasicForm'
import CustomerVehicleForm from './CustomerVehicleForm'
import CustomerPaymentForm from './CustomerPaymentForm'

const style = theme => ({
  root: {
    background: '#fafafa',
    width: 'auto'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      padding: theme.spacing.unit * 3,
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: theme.spacing.unit * 6
    }
  },
  formTitle: {
    fontSize: '1.25rem'
  }
})

const steps = ['Basic details', 'Vehicle details', 'Payment details', 'Review']

class SignUp extends Component {
  componentDidMount() {
    this.props.persistOutlinedBtn()
  }

  state = {
    activeStep: 0
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

  stepperOptions = {
    handleNext: this.handleNext,
    handleBack: this.handleBack,
    activeStep: this.state.activeStep,
    stepLength: steps.length
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
        return <CustomerBasicForm {...this.stepperOptions} />
      default:
        throw new Error('Unknown step')
    }
  }

  render() {
    const {
      classes: { root, paper }
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
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
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
