import React, { Component, Fragment } from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import { UserContext } from '../Context'
import ItemForm from '../SignUp/utils/ItemForm'
import api from '../api'

class VehicleProfile extends Component {
  static contextType = UserContext
  vehicleFormRef = null

  initState = () => {
    const user = this.context
    let { vehicleList } = user.userDetails
    vehicleList = vehicleList.map((vehicle, idx) => {
      return { ...vehicle, id: `item-${idx}`, dbId: vehicle.id }
    })
    return { vehicleList, original: vehicleList }
  }

  state = {
    ...this.initState()
  }

  handleSubmit = async event => {
    event.preventDefault()
    const { original } = this.state

    let vehicleList = this.vehicleFormRef.state.itemList
    console.log('original', original)
    console.log('after', vehicleList)

    let addedVehicles = vehicleList.filter(vehicle => {
      if (
        vehicle.hasOwnProperty('removeStatus') &&
        !vehicle.hasOwnProperty('dbId')
      ) {
        return true
      }
      return false
    })

    // console.log('added', addedVehicles)

    let removedVehicles = original.filter(vehicle => {
      if (vehicleList.find(x => x.dbId === vehicle.dbId)) {
        return false
      }
      return true
    })
    // console.log('removed', removedVehicles)

    // let updatedVehicles = vehicleList.filter(vehicle => {
    //   if (original.find(x => x.dbId === vehicle.dbId)) {
    //     return true
    //   }
    //   return false
    // })
    // console.log('updated', updatedVehicles)

    vehicleList = this.vehicleFormRef.state.itemList.map(vehicle => {
      let cloneVehicle = { ...vehicle }
      delete cloneVehicle.removeStatus
      delete cloneVehicle.id
      return cloneVehicle
    })
    const user = this.context
    const { data: result } = await api.post('/customer/edit-vehicles', {
      add: addedVehicles.map(x => ({
        make: x.make,
        model: x.carModel,
        plateNumber: x.carPlate
      })),
      remove: removedVehicles.map(x => ({ id: x.dbId }))
    })

    if (result.success) {
      user.updateUserDetails({ vehicleList })
      alert('Changes are saved successfully.')
    } else {
      alert(result.error)
    }
  }

  render() {
    const { vehicleList } = this.state
    const itemSchema = {
      make: '',
      carModel: '',
      carPlate: ''
    }
    return (
      <Fragment>
        <Typography variant="h6" color="primary" gutterBottom>
          Vehicle details
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <ItemForm
            populated
            list={vehicleList}
            itemSchema={itemSchema}
            itemType="vehicle"
            innerRef={vehicleFormRef => (this.vehicleFormRef = vehicleFormRef)}
          />
          <Grid item container justify="flex-end" xs={12}>
            <Button color="primary" variant="contained" type="submit">
              Save Changes
            </Button>
          </Grid>
        </form>
      </Fragment>
    )
  }
}

export default VehicleProfile
