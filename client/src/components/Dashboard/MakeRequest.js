import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Input,
  Button
} from '@material-ui/core'
import { UserContext } from '../Context'
import axios from 'axios'
import MapsCurrentRequest from './MapsCurrentRequest'
import api from '../api'

const style = theme => ({
  root: {
    background: '#fff',
    display: 'flex',
    flexDirection: 'column'
  },
  noFocus: {
    '&:focus': {
      background: 'white'
    }
  }
})

class MakeRequest extends Component {
  static contextType = UserContext

  asyncGetCurrentPosition = options =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    })

  getCurrentLocation = async () => {
    if (navigator.geolocation) {
      const {
        coords: { latitude, longitude }
      } = await this.asyncGetCurrentPosition()

      console.log('geolocation accepted', latitude, longitude)
      const geocodeURL =
        'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json'

      const { data: result } = await axios.get(geocodeURL, {
        params: {
          latlng: `${latitude},${longitude}`,
          key: process.env.REACT_APP_GOOGLE_MAPS_API
        }
      })

      if (result.results) {
        const textAddress = result.results[0].formatted_address
        console.log('reverse geocode', textAddress)
        return textAddress
      } else {
        console.log('no results found')
        return ''
      }
    } else {
      // Browser doesn't support Geolocation
      console.log('browser doesnt support geolocation.')
      return ''
    }
  }

  initState = async () => {
    const user = this.context
    const { vehicleList } = user.userDetails

    const address = await this.getCurrentLocation()

    return {
      vehicleList: vehicleList.map(vehicle => ({
        id: vehicle.id,
        details: `${vehicle.carModel} - ${vehicle.carPlate}`
      })),
      address
    }
  }

  async componentDidMount() {
    const state = await this.initState()
    this.setState({
      ...state,
      suggestions: [],
      isLoading: false
    })
  }

  state = {
    isLoading: true,
    vehicle: '',
    description: '',
    vehicleId: ''
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleVehicleChange = event => {
    event.persist()
    this.setState(state => ({
      vehicle: event.target.value,
      vehicleId: state.vehicleList.find(x => x.details === event.target.value)
        .id
    }))
  }

  handleSubmit = async event => {
    event.preventDefault()
    const geocodeURL =
      'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json'

    const { data: geocodeResult } = await axios.get(geocodeURL, {
      params: {
        address: this.state.address,
        key: process.env.REACT_APP_GOOGLE_MAPS_API
      }
    })

    if (geocodeResult.results) {
      console.log('geocode result', geocodeResult.results[0])
      const { lat, lng } = geocodeResult.results[0].geometry.location
      const { address, vehicleId, description } = this.state
      const { data: result } = await api.post('/callout/customer/create', {
        location: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        address,
        vehicleId,
        description
      })

      if (result.success) {
        console.log(result)
        const { handleInnerChange } = this.props
        handleInnerChange({ loadingResponse: true })
      } else {
        alert(result.error)
      }
    } else {
      alert('no result found!')
      return
    }
  }

  render() {
    const {
      classes: { noFocus }
    } = this.props

    console.log(this.state)

    const {
      address,
      suggestions,
      description,
      isLoading,
      vehicleList,
      vehicle
    } = this.state

    console.log(this.state)
    if (isLoading) return <Typography variant="body2">Loading...</Typography>

    return (
      <Fragment>
        <Grid container spacing={24}>
          <Grid
            item
            style={{
              width: 600
            }}
          >
            <Typography variant="h6" color="primary" gutterBottom>
              Make a new request
            </Typography>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <form onSubmit={this.handleSubmit}>
                  <Grid container spacing={8}>
                    <Grid item xs={12}>
                      <MapsCurrentRequest
                        onChange={(address, suggestions) => {
                          this.setState({
                            address,
                            suggestions
                          })
                        }}
                        address={address}
                        suggestions={suggestions}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel shrink htmlFor="vehicle">
                          Vehicle
                        </InputLabel>
                        <Select
                          native
                          required
                          value={vehicle}
                          onChange={this.handleVehicleChange}
                          input={<Input name="vehicle" id="vehicle" required />}
                          inputProps={{
                            name: 'vehicle',
                            id: 'vehicle'
                          }}
                          classes={{
                            select: noFocus
                          }}
                        >
                          <option value="">None</option>
                          {vehicleList.map((vehicle, idx) => (
                            <option value={vehicle.details} key={idx}>
                              {vehicle.details}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="description"
                        name="description"
                        onChange={this.handleChange}
                        value={description}
                        label="Description"
                        placeholder="Please provide your vehicle's issues"
                        multiline
                        rows="4"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </Grid>
                    <Grid item container justify="flex-end" xs={12}>
                      <Button color="primary" variant="contained" type="submit">
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

export default withStyles(style)(MakeRequest)
