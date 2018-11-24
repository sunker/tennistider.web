import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

function DateAndTimePickers(props) {
  const { classes, label, value, onValueChange } = props

  return (
    <TextField
      id="datetime-local"
      label={label}
      type="date"
      defaultValue={value}
      className={`form-item ${classes.textField}`}
      InputLabelProps={{
        shrink: true
      }}
      onChange={onValueChange}
      style={{ marginLeft: 0, marginRight: 0, width: '100%' }}
    />
  )
}

DateAndTimePickers.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired
}

export default withStyles(styles)(DateAndTimePickers)
