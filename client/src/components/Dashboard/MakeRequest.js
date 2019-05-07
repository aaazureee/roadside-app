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
  MenuItem,
  FormHelperText,
  Button
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { UserContext } from '../Context'
import axios from 'axios'
import MapsCurrentRequest from './MapsCurrentRequest'

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
  },
  container: {
    maxWidth: 800
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
    loadingResponse: false
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({
      loadingResponse: true
    })
  }

  render() {
    const {
      classes: { noFocus, container }
    } = this.props

    const user = this.context
    // const { userType } = user.userDetails

    const {
      address,
      suggestions,
      description,
      isLoading,
      vehicleList,
      vehicle,
      loadingResponse
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
                        loadingResponse={loadingResponse}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {!loadingResponse ? (
                        <FormControl fullWidth>
                          <InputLabel shrink htmlFor="vehicle">
                            Vehicle
                          </InputLabel>
                          <Select
                            native
                            required
                            value={vehicle}
                            onChange={this.handleChange}
                            input={
                              <Input name="vehicle" id="vehicle" required />
                            }
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
                      ) : (
                        <TextField
                          required
                          id="vehicle"
                          name="vehicle"
                          label="Vehicle"
                          type="text"
                          fullWidth
                          value={vehicle}
                          InputProps={{
                            readOnly: true
                          }}
                        />
                      )}
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
                        InputProps={{
                          readOnly: loadingResponse
                        }}
                      />
                    </Grid>
                    {!loadingResponse && (
                      <Grid item container justify="flex-end" xs={12}>
                        <Button
                          color="primary"
                          variant="contained"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>

          {loadingResponse && (
            <Grid
              item
              style={{
                width: 450,
                border: '2px solid black'
              }}
            >
              <Typography variant="h6" color="primary" gutterBottom>
                Available Professionals
              </Typography>
              <div>
                <Typography varian="body2">Waiting for responses...</Typography>
              </div>
            </Grid>
          )}
        </Grid>
      </Fragment>
    )
  }
}

export default withStyles(style)(MakeRequest)
