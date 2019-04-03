import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Button } from '@material-ui/core'
import ItemForm from './utils/ItemForm'

const style = theme => ({
  backBtn: {
    marginRight: theme.spacing.unit
  }
})

class CustomerVehicleForm extends Component {
  vehicleFormRef = null

  handleSubmit = event => {
    event.preventDefault()
    let vehicleList = this.vehicleFormRef.state.itemList.map(vehicle => {
      let cloneVehicle = { ...vehicle }
      delete cloneVehicle.removeStatus
      delete cloneVehicle.id
      return cloneVehicle
    })
    this.props.updateUserDetails({ vehicleList })
    this.props.handleNext()
  }

  render() {
    const {
      classes: { backBtn },
      handleBack
    } = this.props

    const itemSchema = {
      carModel: '',
      carPlate: ''
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <ItemForm
          itemSchema={itemSchema}
          itemType="vehicle"
          innerRef={vehicleFormRef => (this.vehicleFormRef = vehicleFormRef)}
        />
        <Grid container justify="flex-end">
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

export default withStyles(style)(CustomerVehicleForm)
