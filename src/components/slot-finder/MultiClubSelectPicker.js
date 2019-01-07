import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../../styles'
import PropTypes from 'prop-types'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'
import Select from '@material-ui/core/Select'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import SelectAllIcon from '@material-ui/icons/SelectAll'
import Divider from '@material-ui/core/Divider'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      maxWidth: '100%'
    }
  }
}

class MultiClubSelectPicker extends Component {
  constructor() {
    super()
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    const { clubs, onValueChange } = this.props
    if (event.target.value.includes(undefined)) {
      let value = []
      if (clubs.every(c => c.selected)) {
        value = []
      } else {
        value = clubs.map(c => c.id)
      }
      onValueChange({ target: { value } })
    } else {
      onValueChange(event)
    }
  }

  render() {
    const { clubs } = this.props
    const allSelected = clubs.every(c => c.selected)
    const options = [...clubs]
    return (
      <FormControl className={'form-item'}>
        <InputLabel htmlFor="select-multiple-clubs">Klubbar</InputLabel>
        <Select
          style={{ maxWidth: '100%' }}
          multiple
          value={options.filter(x => x.selected).map(y => y.id)}
          onChange={this.onChange}
          input={<Input id="select-multiple-clubs" />}
          MenuProps={MenuProps}
          renderValue={selected => (
            <div>
              {options.filter(x => x.selected).length > 3
                ? `${options.filter(x => x.selected).length} klubbar valda`
                : options
                    .filter(x => x.selected)
                    .map((c, i) => <Chip key={c.id} label={c.name} />)}
            </div>
          )}
        >
          <MenuItem key={0}>
            <ListItemText
              primary={allSelected ? 'Avmarkera alla' : 'Markera alla'}
            />
            <ListItemIcon>
              <SelectAllIcon />
            </ListItemIcon>
          </MenuItem>
          <Divider light />
          {options.map((c, i) => (
            <MenuItem value={c.id} key={i}>
              <Checkbox checked={c.selected} />
              <ListItemText primary={c.name} secondary={c.location} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
}

MultiClubSelectPicker.propTypes = {
  classes: PropTypes.object.isRequired,
  onValueChange: PropTypes.func.isRequired
}

export default withStyles(styles)(MultiClubSelectPicker)
