import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Button } from '@material-ui/core'

const style = theme => ({
  backBtn: {
    marginRight: theme.spacing.unit
  }
})

class CustomerReview extends Component {
  state = {}

  handleSubmit = event => {
    event.preventDefault()
    this.props.handleNext()
  }

  render() {
    const {
      classes: { backBtn },
      handleBack,
      userDetails
    } = this.props
    console.log('In customer review', userDetails)
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={24}>
          <Grid item container justify="flex-end" xs={12}>
            {/* prettier-ignore */}
            <Button onClick={handleBack} className={backBtn}>
                Back
              </Button>
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

export default withStyles(style)(CustomerReview)
