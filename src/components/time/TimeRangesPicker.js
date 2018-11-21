import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../../styles'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Slider from '../Slider'

class TimeRangesPicker extends Component {
  constructor() {
    super()
    this.handleTimeChange = this.handleTimeChange.bind(this)
  }

  roundToTimeDecimal(nonTimeDecimal) {
    return nonTimeDecimal % 1 !== 0
      ? Math.trunc(nonTimeDecimal) + 0.3
      : nonTimeDecimal
  }

  handleTimeChange([startTime, endTime], index) {
    startTime = this.roundToTimeDecimal(startTime)
    endTime = this.roundToTimeDecimal(endTime)
    this.props.onRangeValueChange(
      [startTime, endTime],
      index,
      this.props.clubId
    )
  }

  render() {
    let { clubId, timeRanges, onRangeActiveChange } = this.props
    return (
      <List component="div" disablePadding>
        {timeRanges.map((timeRange, i) => (
          <ListItem style={{ paddingLeft: 0 }} key={i}>
            <Checkbox
              style={{ paddingRight: 6 }}
              checked={timeRange.model.active}
              onClick={() => onRangeActiveChange(i, clubId)}
            />
            <ListItemText
              style={{ paddingLeft: 0 }}
              primary={timeRange.label}
            />
            <Slider
              onValueChange={this.handleTimeChange}
              model={{ ...timeRange.model, index: i }}
              picker={timeRange}
              label={`${timeRange.model.startTime.toFixed(
                2
              )} - ${timeRange.model.endTime.toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
    )
  }
}

TimeRangesPicker.propTypes = {
  clubId: PropTypes.number,
  timeRanges: PropTypes.array.isRequired,
  onRangeValueChange: PropTypes.func.isRequired,
  onRangeActiveChange: PropTypes.func.isRequired
}

export default withStyles(styles)(TimeRangesPicker)
