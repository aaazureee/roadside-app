import React, { Component } from 'react'
import deburr from 'lodash/deburr'
import Downshift from 'downshift'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import axios from 'axios'

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  )
}

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) {
  const isHighlighted = highlightedIndex === index
  const isSelected = (selectedItem || '').indexOf(suggestion.description) > -1

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.description}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.description}
    </MenuItem>
  )
}

function getSuggestions(suggestions, value) {
  const inputValue = deburr(value.trim()).toLowerCase()
  const inputLength = inputValue.length

  return inputLength === 0
    ? []
    : suggestions
        .filter(suggestion => {
          const keep =
            suggestion.description.slice(0, inputLength).toLowerCase() ===
            inputValue

          return keep
        })
        .slice(0, 5)
}

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  inputRoot: {
    flexWrap: 'wrap'
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1
  }
})

class MapsAddress extends Component {
  placesURL =
    'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json'

  handleChange = async value => {
    const { onChange, address, suggestions } = this.props
    if (value) {
      const { data: result } = await axios.get(this.placesURL, {
        params: {
          input: value,
          location: '-34.4278121,150.8930607',
          radius: 5000,
          key: process.env.REACT_APP_GOOGLE_MAPS_API
        }
      })
      console.log(result)
      if (result.status !== 'OK') {
        console.log('Error in requesting API.')
        onChange(address, [])
      } else {
        onChange(value, result.predictions)
      }
    } else {
      onChange('', suggestions)
    }
  }

  render() {
    const {
      classes: { container, paper },
      classes
    } = this.props

    const { suggestions, address } = this.props
    console.log('props', address)

    return (
      <div>
        <Downshift
          onInputValueChange={this.handleChange}
          initialInputValue={address}
        >
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            highlightedIndex,
            inputValue,
            isOpen,
            selectedItem
          }) => (
            <div className={container}>
              {renderInput({
                required: true,
                name: 'address',
                label: 'Address',
                fullWidth: true,
                classes,
                InputProps: getInputProps({
                  autoComplete: 'address',
                  id: 'address'
                })
              })}
              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={paper} square>
                    {getSuggestions(suggestions, inputValue).map(
                      (suggestion, index) =>
                        renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({
                            item: suggestion.description
                          }),
                          highlightedIndex,
                          selectedItem
                        })
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          )}
        </Downshift>
      </div>
    )
  }
}

export default withStyles(styles)(MapsAddress)
