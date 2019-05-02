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
  grid: {
    marginBottom: 24
  }
})

class AccountForm extends Component {
  initState = () => {
    const {
      account: { bsb = '', accountNumber = '' } = {}
    } = this.props.userDetails

    return {
      bsb,
      accountNumber
    }
  }

  state = {
    ...this.initState()
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.updateUserDetails({ account: this.state })
    this.props.handleNext()
  }

  handleCustomBack = () => {
    this.props.updateUserDetails({ account: this.state })
    this.props.handleBack()
  }

  render() {
    const {
      classes: { backBtn, denseGrid, grid }
    } = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={24} className={grid}>
          <Grid item xs={12} sm={6} className={denseGrid}>
            <TextField
              required
              id="bsb"
              name="bsb"
              label="BSB"
              type="tel"
              fullWidth
              onChange={this.handleChange}
              value={this.state.bsb}
              inputProps={{
                pattern: '\\d+',
                title: 'Only number is allowed'
              }}
              margin="dense"
            />
          </Grid>

          <Grid item xs={12} sm={6} className={denseGrid}>
            <TextField
              required
              id="accountNumber"
              name="accountNumber"
              label="Account number"
              type="tel"
              fullWidth
              onChange={this.handleChange}
              value={this.state.accountNumber}
              inputProps={{
                pattern: '\\d+',
                title: 'Only number is allowed'
              }}
              margin="dense"
            />
          </Grid>
        </Grid>

        <Grid item container justify="flex-end" xs={12}>
          <Button onClick={this.handleCustomBack} className={backBtn}>
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

export default withStyles(style)(AccountForm)
