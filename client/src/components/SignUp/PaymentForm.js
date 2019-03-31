import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Button } from '@material-ui/core'
import ItemForm from './utils/ItemForm'

const style = theme => ({
  backBtn: {
    marginRight: theme.spacing.unit
  }
})

class PaymentForm extends Component {
  state = {}

  handleSubmit = event => {
    event.preventDefault()
    this.props.handleNext()
  }

  render() {
    const {
      classes: { backBtn },
      handleBack
    } = this.props

    const itemSchema = {
      ccName: '',
      ccNumber: '',
      ccExpMonth: '',
      ccExpYear: '',
      cvv: ''
    }
    
    return (
      <form onSubmit={this.handleSubmit}>
        <ItemForm itemSchema={itemSchema} itemType="vehicle" />
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

export default withStyles(style)(PaymentForm)
