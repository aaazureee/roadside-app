import React, { Component, Fragment } from 'react'
import { Grid, TextField, Button, Typography } from '@material-ui/core'
import { UserContext } from '../Context'
import api from '../api'

class PaymentProfile extends Component {
  static contextType = UserContext

  initState = () => {
    const user = this.context
    let {
      card: { ccName, ccNumber, ccExp, cvv }
    } = user.userDetails

    if (ccExp.length === 4) {
      ccExp = '0' + ccExp
    }
    return {
      ccName,
      ccNumber,
      ccExp,
      cvv
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
    console.log('payment', this.state)

    const user = this.context
    const card = { ...this.state }
    delete card.diff

    const { userType } = user.userDetails

    if (userType === 'customer') {
      const { ccName, ccNumber, ccExp, cvv } = card

      const { data: resultRes } = await api.post('/customer/credit-card', {
        cardNumber: ccNumber,
        name: ccName,
        expireMonth: Number(ccExp.split('/')[0]),
        expireYear: Number('20' + ccExp.split('/')[1]),
        ccv: cvv
      })

      if (resultRes.success) {
        user.updateUserDetails({ card })
        alert('Changes are saved successfully.')
        this.setState({
          diff: false
        })
      } else {
        alert(resultRes.error)
      }
    }
  }

  render() {
    const { diff, ccName, ccNumber, ccExp, cvv } = this.state

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
                id="ccName"
                name="ccName"
                label="Name on card"
                type="text"
                fullWidth
                onChange={this.handleChange}
                value={ccName}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="ccNumber"
                name="ccNumber"
                label="Card number"
                type="tel"
                inputProps={{
                  minLength: 16,
                  maxLength: 16,
                  pattern: '\\d{16}',
                  title: '16-digit card number'
                }}
                fullWidth
                onChange={this.handleChange}
                value={ccNumber}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id={'ccExp'}
                name={'ccExp'}
                label="Expiry date"
                type="text"
                inputProps={{
                  minLength: 5,
                  maxLength: 5,
                  pattern: '(0[1-9]|1[0-2])/(\\d{2})',
                  title: 'mm/yy'
                }}
                fullWidth
                onChange={this.handleChange}
                value={ccExp}
                margin="dense"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="cvv"
                name="cvv"
                label="CVV"
                type="tel"
                inputProps={{
                  minLength: 3,
                  maxLength: 3,
                  pattern: '\\d{3}',
                  title: 'Last three digits on signature strip'
                }}
                fullWidth
                onChange={this.handleChange}
                value={cvv}
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
