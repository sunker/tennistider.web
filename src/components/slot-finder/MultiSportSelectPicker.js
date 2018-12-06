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

class MultiSportSelectPicker extends Component {
  capitalizeTxt = txt => {
    return txt.charAt(0).toUpperCase() + txt.slice(1)
  }

  render() {
    const { sports } = this.props
    return (
      <FormControl className={'form-item'}>
        <InputLabel htmlFor="select-multiple-sports">Sporter</InputLabel>
        <Select
          style={{ maxWidth: '100%' }}
          multiple
          value={sports.filter(x => x.selected).map(y => y.name)}
          onChange={this.props.onValueChange}
          input={<Input id="select-multiple-sports" />}
          MenuProps={MenuProps}
          renderValue={selected => (
            <div>
              {sports.filter(x => x.selected).length > 3
                ? `${sports.filter(x => x.selected).length} sporter valda`
                : sports
                    .filter(x => x.selected)
                    .map((c, i) => (
                      <Chip key={i} label={this.capitalizeTxt(c.name)} />
                    ))}
            </div>
          )}
        >
          {sports.map((c, i) => (
            <MenuItem value={c.name} key={i}>
              <Checkbox checked={c.selected} />
              <ListItemText primary={this.capitalizeTxt(c.name)} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
}

MultiSportSelectPicker.propTypes = {
  classes: PropTypes.object.isRequired,
  onValueChange: PropTypes.func.isRequired
}

export default withStyles(styles)(MultiSportSelectPicker)
