import React, { Component, Fragment } from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import { UserContext } from '../Context'
import ItemForm from '../SignUp/utils/ItemForm'

class VehicleProfile extends Component {
  static contextType = UserContext
  vehicleFormRef = null

  initState = () => {
    const user = this.context
    let { vehicleList } = user.userDetails
    vehicleList = vehicleList.map((vehicle, idx) => {
      return { ...vehicle, id: `item-${idx}` }
    })
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
    console.log('vehicle', vehicleList)

    const user = this.context
    user.updateUserDetails({ vehicleList })
    alert('Changes are saved successfully.')
  }

  render() {
    const { vehicleList } = this.state
    const itemSchema = {
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
