import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../styles'
import PropTypes from 'prop-types'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'
import Select from '@material-ui/core/Select'

var divStyle = {
  width: '100%'
}

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

class MultiClubSelectPicker extends Component {
  render() {
    const { clubs } = this.props
    return (
      <FormControl style={divStyle}>
        <InputLabel htmlFor="select-multiple-chip">Klubbar</InputLabel>
        <Select
          multiple
          value={clubs.filter(x => x.selected).map(y => y.id)}
          onChange={this.props.onValueChange}
          input={<Input id="select-multiple" />}
          MenuProps={MenuProps}
          renderValue={selected => (
            <div>
              {clubs.filter(x => x.selected).map((c, i) => (
                <Chip key={c.id} label={c.name} />
              ))}
            </div>
          )}
        >
          {clubs.map((c, i) => (
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
