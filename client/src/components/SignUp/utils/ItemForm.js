import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, IconButton, Fab, TextField, Typography, Paper } from '@material-ui/core'
import { Add, Delete }  from '@material-ui/icons'

const style = theme => ({
  denseGrid: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important'
  },
  paper: {
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 3
  },
  deleteBtn: {
    verticalAlign: -6,
    marginLeft: -5,
    '&:hover': {
      backgroundColor: 'transparent',
      color: 'rgba(0, 0, 0, 0.65)'
    }
  }
})

class ItemRow extends Component {
  static propTypes = {
    itemData: PropTypes.object.isRequired,
    itemType: PropTypes.oneOf(['vehicle', 'card', 'bankAccount']),
    updateItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    updatedID: PropTypes.number.isRequired
  }

  state = {
    ...this.props.itemData
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => {
      this.props.updateItem(this.state) // update parent item list state
      console.log(this.state.carModel)
    })    
  }

  deleteButton = (
    <IconButton 
      aria-label="Delete" 
      className={this.props.classes.deleteBtn}
      disableRipple
      onClick={() => this.props.removeItem(this.state.id)}
    >
      <Delete />
    </IconButton>
  )

  render() {
    const {
      classes: { denseGrid, paper, deleteBtn },
      updatedID,
      itemType,
      removeItem
    } = this.props

    if (itemType === 'vehicle') {
      const { id, carModel, carPlate } = this.state
      const numberID = Number(id.split('-')[1])      
      return (
        <Paper className={paper}>
          <Grid container spacing={24}>
            <Grid item xs={12}>            
              <Typography variant="h6" style={{
                marginBottom: -16
              }}>
                Vehicle {updatedID + 1}
                {this.deleteButton}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} className={denseGrid}>
              <TextField
                required
                id={`carModel${numberID}`}
                name={`carModel`}
                label="Car model"
                type="text"
                fullWidth
                onChange={this.handleChange}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={6} className={denseGrid}>
              <TextField
                required
                id={`carPlate${numberID}`}
                name={`carPlate`}
                label="Car plate"
                type="text"
                fullWidth
                onChange={this.handleChange}
                margin="dense"
              />
            </Grid>
          </Grid>
        </Paper>
      )
    }
    return <div>123</div>
  }
}

class ItemForm extends Component {
  static propTypes = {
    itemSchema: PropTypes.object.isRequired,
    itemType: PropTypes.oneOf(['vehicle', 'card', 'bankAccount'])
  }


  state = {
    itemList: [
      {
        id: 'item-0',
        ...this.props.itemSchema
      }
    ]
  }

  addItem = id => {
    this.setState(state => ({
      ...state,
      itemList: [
        ...state.itemList,
        {
          id,
          ...this.props.itemSchema
        }
      ]
    }))
  }

  removeItem = id => {
    if (this.state.itemList.length === 1) {
      return
    }
    this.setState(state => ({
      ...state,
      itemList: state.itemList.filter(item => {
        return item.id !== id
      })
    }))
  }

  updateItem = itemDetails => {
    this.setState(state => ({
      ...state,
      itemList: state.itemList.map(item => {
        let id = Number(itemDetails.id.split('-')[1])
        let listID = Number(item.id.split('-')[1])
        if (listID !== id) { // original item remains if id not matched
          return item
        }

        return {
          ...item,
          ...itemDetails
        }
      })
    }))
  }

  updateItemFunctions = {
    updateItem: this.updateItem,
    removeItem: this.removeItem
  }

  render() {
    console.log('Item form state', this.state)
    const { itemList } = this.state
    const { classes, itemType } = this.props
    const renderedList = itemList.map((item, index) => {
      return (
        <ItemRow
          key={item.id}
          itemData={item}
          updatedID={index}
          itemType={itemType}
          classes={classes}
          {...this.updateItemFunctions}
        />
      )
    })

    return (
      <Fragment>
        {renderedList}
        <div style={{
          textAlign: 'center'
        }}>
          <Fab color="secondary" aria-label="Add" onClick={() => {
            let lastID = Number(itemList[itemList.length - 1].id.split('-')[1])
            let id = `item-${lastID + 1}`
            this.addItem(id)
          }}>
            <Add />
          </Fab>         
        </div>
      </Fragment>
    )
  }
}

export default withStyles(style)(ItemForm)
