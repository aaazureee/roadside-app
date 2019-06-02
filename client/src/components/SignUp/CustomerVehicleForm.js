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

  initState = () => {
    let { vehicleList = [] } = this.props.userDetails
    if (vehicleList.length) {
      vehicleList = vehicleList.map((vehicle, idx) => {
        return { ...vehicle, id: `item-${idx}` }
      })
    }
    return { vehicleList }
  }

  state = {
    ...this.initState()
  }

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

  handleBackCustom = () => {
    let vehicleList = this.vehicleFormRef.state.itemList.map(vehicle => {
      let cloneVehicle = { ...vehicle }
      delete cloneVehicle.removeStatus
      delete cloneVehicle.id
      return cloneVehicle
    })
    this.props.updateUserDetails({ vehicleList })
    this.props.handleBack()
  }

  render() {
    const {
      classes: { backBtn }
    } = this.props

    console.log('vehicle form', this.state)

    const itemSchema = {
      make: '',
      carModel: '',
      carPlate: ''
    }

    const { vehicleList } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        {vehicleList.length ? (
          <ItemForm
            populated
            list={vehicleList}
            itemSchema={itemSchema}
            itemType="vehicle"
            innerRef={vehicleFormRef => (this.vehicleFormRef = vehicleFormRef)}
          />
        ) : (
          <ItemForm
            itemSchema={itemSchema}
            itemType="vehicle"
            innerRef={vehicleFormRef => (this.vehicleFormRef = vehicleFormRef)}
          />
        )}

        <Grid container justify="flex-end">
          <Button onClick={this.handleBackCustom} className={backBtn}>
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
