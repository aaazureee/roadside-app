import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

const style = theme => ({})

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
  }

  render() {
    return <form onSubmit={this.handleSubmit}>dkaposdkaspodkopsakop</form>
  }
}

const VehicleRow = props => {}

export default withStyles(style)(CustomerVehicleForm)
