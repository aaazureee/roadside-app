import React, { Component, Fragment } from 'react'
import { Grid, TextField, Button, Typography } from '@material-ui/core'
import { UserContext } from '../Context'

class BasicProfile extends Component {
  static contextType = UserContext

  initState = () => {
    const user = this.context
    const { firstName, lastName, email, address, phone } = user.userDetails
    return {
      firstName,
      lastName,
      email,
      address,
      phone
    }
  }

  state = {
    ...this.initState(),
    diff: false
  }

  handleChange = event => {
    const { [event.target.name]: original } = this.initState()
    console.log('original', original)
    this.setState({
      [event.target.name]: event.target.value,
      diff: event.target.value !== original
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const user = this.context
    const basic = { ...this.state }
    delete basic.diff
    console.log('basic', basic)
    user.updateUserDetails(basic)
    localStorage.setItem(
      'user',
      JSON.stringify({ ...user.userDetails, ...basic })
    )
    alert('Changes are saved successfully.')
  }

  render() {
    const { diff, firstName, lastName, email, phone, address } = this.state

    return (
      <Fragment>
        <Typography variant="h6" color="primary" gutterBottom>
          Basic details
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                type="text"
                fullWidth
                onChange={this.handleChange}
                value={firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                type="text"
                fullWidth
                onChange={this.handleChange}
                value={lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                type="email"
                fullWidth
                onChange={this.handleChange}
                value={email}
                InputProps={{
                  readOnly: true
                }}
                helperText="Cannot be changed."
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id="address"
                name="address"
                label="Address"
                type="text"
                fullWidth
                onChange={this.handleChange}
                value={address}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id="phone"
                name="phone"
                label="Phone number"
                type="tel"
                fullWidth
                onChange={this.handleChange}
                value={phone}
              />
            </Grid>

            <Grid item container justify="flex-end" xs={12}>
              {diff ? (
                <Button color="primary" variant="contained" type="submit">
                  Save Changes
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled
                  style={{
                    cursor: 'not-allowed',
                    pointerEvents: 'initial'
                  }}
                >
                  Save Changes
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Fragment>
    )
  }
}

export default BasicProfile
