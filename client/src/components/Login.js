import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import classNames from 'classnames'
import { UserContext } from './Context'
import api from './api'

const style = theme => ({
  root: {
    background: '#fff',
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  paper: {
    padding: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up(400 + theme.spacing.unit * 2)]: {
      padding: theme.spacing.unit * 3,
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  titleText: {
    marginBottom: theme.spacing.unit * 2
  },
  checkboxDiv: {
    paddingTop: '0 !important'
  },
  checkboxLabel: {
    lineHeight: 0
  }
})

class Login extends Component {
  static contextType = UserContext

  state = {
    showPassword: false,
    email: '',
    password: '',
    rememberMe: true
  }

  handleShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }))
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCheckboxChange = event => {
    this.setState({
      [event.target.name]: event.target.checked
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const { email, password, rememberMe } = this.state
    const user = this.context
    const { data: result } = await api.post('/auth/login', {
      email,
      password,
      rememberMe
    })

    if (result.success) {
      if (result.userType === 'customer') {
        const { data: detailsResult } = await api.get('/customer/details')
        const { data: userDetails } = detailsResult
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
        delete userDetails.vehicles

        console.log('after log in', userDetails)
        user.updateUserDetails(userDetails)
        this.props.history.push('/')
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
        user.updateUserDetails(userDetails)
        this.props.history.push('/')
      } else if (result.userType === 'admin') {
        user.updateUserDetails(result)
        this.props.history.push('/')
      }
    } else {
      alert(result.error)
    }
  }

  render() {
    const {
      classes: { root, paper, titleText, checkboxDiv, checkboxLabel }
    } = this.props
    return (
      <main className={classNames('mainContent', root)}>
        <Paper className={paper}>
          <Typography
            variant="h5"
            color="primary"
            align="center"
            className={titleText}
          >
            Login
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleShowPassword}
                        >
                          {this.state.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} className={checkboxDiv}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name="rememberMe"
                      checked={this.state.rememberMe}
                      onChange={this.handleCheckboxChange}
                    />
                  }
                  classes={{
                    label: checkboxLabel
                  }}
                  label="Remember me"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                >
                  <Typography variant="h6" color="inherit">
                    Login
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </main>
    )
  }
}

export default withStyles(style)(Login)
