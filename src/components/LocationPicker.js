import React, { Component } from 'react'
import { connect } from 'react-redux'
import Input from '@material-ui/core/Input'
import Chip from '@material-ui/core/Chip'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import PropTypes from 'prop-types'
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
  render() {
    const { locations } = this.props
    return (
      <FormControl className={'form-item'}>
        <InputLabel htmlFor="select-multiple-locations">Städer</InputLabel>
        <Select
          multiple
          value={locations.filter(x => x.selected).map(y => y.name)}
          onChange={this.props.onValueChange}
          input={<Input id="select-multiple-locations" />}
          MenuProps={MenuProps}
          renderValue={selected => (
            <div>
              {locations.filter(x => x.selected).length > 3
                ? 'Flera städer valda'
                : locations
                    .filter(x => x.selected)
                    .map((value, i) => (
                      <Chip key={value.name} label={value.name} />
                    ))}
            </div>
          )}
        >
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
  onValueChange: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired
}

export default connect(
  null,
  {}
)(LocationPicker)
