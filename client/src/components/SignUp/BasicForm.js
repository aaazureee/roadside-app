import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  IconButton
} from '@material-ui/core'

import { Visibility, VisibilityOff } from '@material-ui/icons'
import MapsAdress from './MapsAdress'
import axios from 'axios'

const style = theme => ({
  denseGrid: {
    paddingTop: '8px !important',
    paddingBottom: '8px !important'
  }
})

class CustomerBasicForm extends Component {
  initState = () => {
    const {
      firstName = '',
      lastName = '',
      email = '',
      address = '',
      phone = '',
      password = '',
      suggestions = []
    } = this.props.userDetails

    return {
      showPassword: false,
      firstName,
      lastName,
      email,
      address,
      phone,
      password,
      suggestions
    }
  }

  state = {
    ...this.initState()
  }

  handleShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }))
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const { showPassword, suggestions, ...newUserDetails } = this.state

    const geocodeURL =
      'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json'

    console.log('Address', this.state.address)
    const { data: result } = await axios.get(geocodeURL, {
      params: {
        address: this.state.address,
        key: process.env.REACT_APP_GOOGLE_MAPS_API
      }
    })
    if (result.results) {
      console.log('geocode result', result.results[0])
      newUserDetails.lat = result.results[0].geometry.location.lat
      newUserDetails.lng = result.results[0].geometry.location.lng
    } else {
      console.log('no result found!')
    }

    this.props.updateUserDetails(newUserDetails)
    this.props.handleNext()
  }

  render() {
    const {
      classes: { denseGrid }
    } = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6} className={denseGrid}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={denseGrid}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.lastName}
            />
          </Grid>
          <Grid item xs={12} className={denseGrid}>
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

          <Grid item xs={12} className={denseGrid}>
            <MapsAdress
              onChange={(address, suggestions) => {
                this.setState({
                  address,
                  suggestions
                })
              }}
              address={this.state.address}
              suggestions={this.state.suggestions}
            />
          </Grid>

          <Grid item xs={12} className={denseGrid}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Phone number"
              type="tel"
              fullWidth
              onChange={this.handleChange}
              value={this.state.phone}
            />
          </Grid>

          <Grid item xs={12} className={denseGrid}>
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

          <Grid item container justify="flex-end" xs={12}>
            <Button color="primary" variant="contained" type="submit">
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

export default withStyles(style)(CustomerBasicForm)
