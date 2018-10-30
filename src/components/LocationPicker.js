import React, { Component } from 'react'
import { connect } from 'react-redux'
import Input from '@material-ui/core/Input'
import Chip from '@material-ui/core/Chip'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import PropTypes from 'prop-types'
import { toggleLocation } from '../actions/userSettings'
import { getLocationsWithUserData } from '../selectors'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

class LocationPicker extends Component {
  constructor() {
    super()
    this.handleToggle = this.handleToggle.bind(this)
  }
  handleToggle(event) {
    this.props.toggleLocation(event.target.value)
  }

  render() {
    const { locations } = this.props
    return (
      <FormControl>
        <InputLabel htmlFor="select-multiple-chip">Städer</InputLabel>
        <Select
          multiple
          value={locations.filter(x => x.selected).map(y => y.name)}
          onChange={this.handleToggle}
          input={<Input id="select-multiple" />}
          MenuProps={MenuProps}
          //   renderValue={selected => selected.join(', ')}
          renderValue={selected => (
            <div>
              {locations.filter(x => x.selected).map((value, i) => (
                <Chip key={value.name} label={value.name} />
              ))}
            </div>
          )}
        >
          {/* {locations.map((l, i) => (
            <Chip value={l.name} key={i} label={l.name} />
          ))} */}
          {locations.map((l, i) => (
            <MenuItem value={l.name} key={i}>
              <Checkbox checked={l.selected} />
              <ListItemText primary={l.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
}

LocationPicker.propTypes = {
  toggleLocation: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  locations: getLocationsWithUserData(state)
})

export default connect(
  mapStateToProps,
  { toggleLocation }
)(LocationPicker)
