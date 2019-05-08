import React, { Component, Fragment } from 'react'
import { Grid, TextField, Button, Typography } from '@material-ui/core'
import { UserContext } from '../Context'
import api from '../api'

class PaymentProfile extends Component {
  static contextType = UserContext

  initState = () => {
    const user = this.context
    const {
      account: { bsb, accountNumber }
    } = user.userDetails
    return {
      bsb,
      accountNumber
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

  handleSubmit = async event => {
    event.preventDefault()
    console.log('account', this.state)
    const user = this.context
    const account = { ...this.state }
    delete account.diff

    const { bsb, accountNumber } = account

    const { data: resultRes } = await api.post('/professional/details', {
      bsb,
      accountNumber
    })

    if (resultRes.success) {
      user.updateUserDetails({ account })
      alert('Changes are saved successfully.')
      this.setState({
        diff: false
      })
    } else {
      alert(resultRes.error)
    }
  }

  render() {
    const { diff, bsb, accountNumber } = this.state

    return (
      <Fragment>
        <Typography variant="h6" color="primary" gutterBottom>
          Payment details
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="bsb"
                name="bsb"
                label="BSB"
                type="tel"
                fullWidth
                onChange={this.handleChange}
                value={bsb}
                inputProps={{
                  pattern: '\\d+',
                  title: 'Only number is allowed'
                }}
                margin="dense"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="accountNumber"
                name="accountNumber"
                label="Account number"
                type="tel"
                fullWidth
                onChange={this.handleChange}
                value={accountNumber}
                inputProps={{
                  pattern: '\\d+',
                  title: 'Only number is allowed'
                }}
                margin="dense"
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

export default PaymentProfile
