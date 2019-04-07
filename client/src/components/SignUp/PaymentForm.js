import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Button, TextField } from '@material-ui/core'

const style = theme => ({
  backBtn: {
    marginRight: theme.spacing.unit
  },
  denseGrid: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important'
  },
  helperText: {
    marginTop: 8,
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.45)'
  },
  grid: {
    marginBottom: 24
  }
})

class PaymentForm extends Component {
  state = {
    ccName: '',
    ccNumber: '',
    ccExp: '',
    cvv: ''
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.updateUserDetails({ card: this.state })
    this.props.handleNext()
  }

  render() {
    const {
      classes: { backBtn, denseGrid, helperText, grid },
      handleBack
    } = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={24} className={grid}>
          <Grid item xs={12} sm={6} className={denseGrid}>
            <TextField
              required
              id="ccName"
              name="ccName"
              label="Name on card"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.ccName}
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={6} className={denseGrid}>
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
              value={this.state.ccNumber}
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={6} className={denseGrid}>
            <TextField
              required
              id={'ccExp'}
              name={'ccExp'}
              label="Expiry date"
              type="text"
              inputProps={{
                minLength: 5,
                maxLength: 5,
                pattern: '(0[1-9]|1[0-2])/(\\d{2})'
              }}
              fullWidth
              onChange={this.handleChange}
              value={this.state.ccExp}
              margin="dense"
              helperText="e.g. 09/20"
              FormHelperTextProps={{
                classes: {
                  marginDense: helperText
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={denseGrid}>
            <TextField
              required
              id="cvv"
              name="cvv"
              label="CVV"
              type="tel"
              inputProps={{
                minLength: 3,
                maxLength: 3,
                pattern: '\\d{3}'
              }}
              helperText="Last three digits on signature strip"
              fullWidth
              onChange={this.handleChange}
              value={this.state.cvv}
              margin="dense"
              FormHelperTextProps={{
                classes: {
                  marginDense: helperText
                }
              }}
            />
          </Grid>
        </Grid>

        <Grid item container justify="flex-end" xs={12}>
          <Button onClick={handleBack} className={backBtn}>
            Back
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Next
          </Button>
        </Grid>
      </form>
    )
  }
}

export default withStyles(style)(PaymentForm)
