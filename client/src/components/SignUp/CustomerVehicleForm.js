import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Button } from '@material-ui/core'

const style = theme => ({
  backBtn: {
    marginRight: theme.spacing.unit
  }
})

class CustomerVehicleForm extends Component {
  state = {
    vehicleList: [
      { carModel: 'KAPPA', carPlate: 'ONCE-123' },
      {
        carModel: 'KAPPA2',
        carPlate: 'ynw-123'
      }
    ]
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.handleNext()
  }

  render() {
    const {
      classes: { backBtn },
      handleBack
    } = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={24}>
          <Grid item container justify="flex-end" xs={12}>
            {/* prettier-ignore */}
            <Button onClick={handleBack} className={backBtn}>
                Back
              </Button>
            <Button color="primary" variant="contained" type="submit">
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

const VehicleRow = props => {}

export default withStyles(style)(CustomerVehicleForm)
