import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import classNames from 'classnames'

const style = theme => ({
  root: {
    background: '#fff',
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  paper: {
    padding: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up(400 + theme.spacing.unit * 2)]: {
      padding: theme.spacing.unit * 3,
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  titleText: {
    marginBottom: theme.spacing.unit * 2
  },
  checkboxDiv: {
    paddingTop: '0 !important'
  },
  checkboxLabel: {
    lineHeight: 0
  }
})

class Login extends Component {
  state = {
    showPassword: false,
    email: '',
    password: '',
    rememberMe: true
  }

  handleShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }))
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCheckboxChange = event => {
    this.setState({
      [event.target.name]: event.target.checked
    })
  }

  handleSubmit = event => {
    event.preventDefault()
  }

  render() {
    const {
      classes: { root, paper, titleText, checkboxDiv, checkboxLabel }
    } = this.props
    console.log(this.state)
    return (
      <main className={classNames('mainContent', root)}>
        <Paper className={paper}>
          <Typography
            variant="h5"
            color="primary"
            align="center"
            className={titleText}
          >
            Login
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  fullWidth
                  onChange={this.handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleShowPassword}
                        >
                          {this.state.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} className={checkboxDiv}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name="rememberMe"
                      checked={this.state.rememberMe}
                      onChange={this.handleCheckboxChange}
                    />
                  }
                  classes={{
                    label: checkboxLabel
                  }}
                  label="Remember me"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                >
                  <Typography variant="h6" color="inherit">
                    Login
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </main>
    )
  }
}

export default withStyles(style)(Login)
