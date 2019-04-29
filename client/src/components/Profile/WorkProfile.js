import React, { Component, Fragment } from 'react'
import {
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  Input,
  InputAdornment,
  FormHelperText
} from '@material-ui/core'
import { UserContext } from '../Context'

class WorkProfile extends Component {
  static contextType = UserContext

  initState = () => {
    const user = this.context
    const { workingRadius, abn } = user.userDetails
    return {
      workingRadius,
      abn
    }
  }

  state = {
    ...this.initState(),
    diff: false
  }

  handleChange = event => {
    let { [event.target.name]: original } = this.initState()
    original = String(original)
    console.log('original', original)
    this.setState({
      [event.target.name]:
        event.target.name === 'workingRadius'
          ? Number(event.target.value)
          : event.target.value,
      diff: event.target.value !== original
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log('work', this.state)
  }

  render() {
    const { diff, workingRadius, abn } = this.state

    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <label htmlFor="abn">
                <Typography variant="h6" color="primary">
                  ABN
                </Typography>
              </label>
              <TextField
                required
                id="abn"
                name="abn"
                helperText="Australian Business Number (11-digit)"
                margin="dense"
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  minLength: 11,
                  maxLength: 11,
                  pattern: '\\d{11}'
                }}
                value={abn}
                onChange={this.handleChange}
                style={{
                  marginTop: 0
                }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" color="primary">
                Work Radius
              </Typography>
              <FormControl>
                <Input
                  id="customRadius"
                  name="workingRadius"
                  endAdornment={
                    <InputAdornment position="end">km</InputAdornment>
                  }
                  style={{
                    width: 75,
                    fontSize: '0.875rem'
                  }}
                  type="number"
                  inputProps={{
                    min: 1
                  }}
                  onChange={this.handleChange}
                  value={workingRadius}
                />

                <FormHelperText id="weight-helper-text">
                  Work Radius
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item container justify="flex-end" xs={12}>
              {diff ? (
                <Button color="primary" variant="contained" type="submit">
                  Save Changes
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled
                  style={{
                    cursor: 'not-allowed',
                    pointerEvents: 'initial'
                  }}
                >
                  Save Changes
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Fragment>
    )
  }
}

export default WorkProfile
