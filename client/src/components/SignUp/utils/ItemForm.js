import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, IconButton, Fab, TextField, Typography, Paper, Fade } from '@material-ui/core'
import { Add, Delete }  from '@material-ui/icons'

const style = theme => ({
  denseGrid: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important'
  },
  gridTitle: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
    marginTop: 8,
    marginBottom: -16
  },
  paper: {
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 3,
  },
  deleteBtn: {  
    verticalAlign: -6,
    marginLeft: -5,
    '&:hover': {
      backgroundColor: 'transparent',
      color: 'rgba(0, 0, 0, 0.65)'
    }
  },
  helperText: {
    marginTop: 8,
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.45)'
  }
})

const ANIMATION_TIME = 250

class ItemRow extends Component {
  static propTypes = {
    itemData: PropTypes.object.isRequired,
    itemType: PropTypes.oneOf(['vehicle', 'card', 'account']),
    updateItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    updatedID: PropTypes.number.isRequired
  }

  state = {
    ...this.props.itemData,
    removeStatus: false
  }

  handleChange = event => {
    event.target.setCustomValidity('')
    this.setState({
      [event.target.name]: event.target.value
    }, () => this.props.updateItem(this.state)) // update parent item list state)    
  }

  renderDeleteButton = () => (
    <IconButton 
      aria-label="Delete" 
      className={this.props.classes.deleteBtn}      
      onClick={() => {
        this.setState({
          removeStatus: true
        }, 
          () => setTimeout(() => {            
            this.setState({
              removeStatus: false
            }, () => this.props.removeItem(this.state.id))
          }, ANIMATION_TIME)
        )        
      }}
    >
      <Delete />
    </IconButton>
  )

  render() {
    const {
      classes: { denseGrid, gridTitle, paper, helperText },
      updatedID,
      itemType,
    } = this.props
    const { id } = this.state
    const numberID = Number(id.split('-')[1])
     
    return (
      <Fade in={!this.state.removeStatus} timeout={ANIMATION_TIME}>
        <Paper className={paper}>
          <Grid container spacing={24}>            
            <Grid item xs={12} className={gridTitle}>            
              <Typography variant="h6">
                {`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} ${updatedID + 1}`}
                {this.renderDeleteButton()}
              </Typography>
            </Grid>

            {(itemType === 'vehicle') && 
              (
                <Fragment>
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
                </Fragment>
              )
            }

            {(itemType === 'card') && 
              (
                <Fragment>
                  <Grid item xs={12} sm={6} className={denseGrid}>
                    <TextField
                      required
                      id={`ccName${numberID}`}
                      name={`ccName`}
                      label="Name on card"
                      type="text"
                      fullWidth
                      onChange={this.handleChange}
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={denseGrid}>
                    <TextField
                      required
                      id={`ccNumber${numberID}`}
                      name={`ccNumber`}
                      label="Card number"
                      type="tel"
                      inputProps={{
                        minLength: 16,
                        maxLength: 16,
                        pattern: "\\d{16}",
                        title: "16-digit card number"  
                      }}
                      fullWidth
                      onChange={this.handleChange}                 
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={denseGrid}>
                    <TextField
                      required
                      id={`ccExp${numberID}`}
                      name={`ccExp`}
                      label="Expiry date"
                      type="text"
                      inputProps={{
                        minLength: 5,
                        maxLength: 5,
                        pattern: "(0[1-9]|1[0-2])/(\\d{2})"
                      }}                
                      fullWidth
                      onChange={this.handleChange}
                      margin="dense"
                      helperText="e.g. 09/20"
                      FormHelperTextProps={{
                        classes: {
                          marginDense: helperText
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={denseGrid}>
                    <TextField
                      required
                      id={`cvv${numberID}`}
                      name={`cvv`}
                      label="CVV"
                      type="tel"
                      inputProps={{
                        minLength: 3,
                        maxLength: 3,
                        pattern: "\\d{3}"
                      }}
                      helperText="Last three digits on signature strip"
                      fullWidth
                      onChange={this.handleChange}
                      margin="dense"
                      FormHelperTextProps={{
                        classes: {
                          marginDense: helperText
                        }
                      }}
                    />
                  </Grid>
                </Fragment>
              )
            }
          </Grid>
        </Paper>
      </Fade>
    ) 
  }
}

class ItemForm extends Component {
  static propTypes = {
    itemSchema: PropTypes.object.isRequired,
    itemType: PropTypes.oneOf(['vehicle', 'card', 'account'])
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
