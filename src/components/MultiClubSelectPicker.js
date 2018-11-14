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
  minWidth: 120,
  maxWidth: 300
}

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
  render() {
    const { clubs } = this.props
    return (
      <FormControl>
        <InputLabel htmlFor="select-multiple-clubs">Klubbar</InputLabel>
        <Select
          style={{ maxWidth: '100%' }}
          multiple
          value={clubs.filter(x => x.selected).map(y => y.id)}
          onChange={this.props.onValueChange}
          input={<Input id="select-multiple-clubs" />}
          MenuProps={MenuProps}
          renderValue={selected => (
            <div>
              {clubs.filter(x => x.selected).length > 3
                ? `${clubs.filter(x => x.selected).length} klubbar valda`
                : clubs
                    .filter(x => x.selected)
                    .map((c, i) => <Chip key={c.id} label={c.name} />)}
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
