import React, { Component } from 'react'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../../styles'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Collapse from '@material-ui/core/Collapse'
import EditOutlined from '@material-ui/icons/EditOutlined'
import { Typography } from '@material-ui/core'
import { toggleTimeRangeActive, setTimeRange } from '../../actions/userSettings'
import { getClubTimeRanges } from '../../selectors'
import Slider from '../Slider'

class TimeRanges extends Component {
  constructor() {
    super()
    this.handleTimeChange = this.handleTimeChange.bind(this)
  }

  handleToggleRange(clubId, timeRanges) {
    this.props.toggleTimeRangeActive(clubId, timeRanges)
  }

  roundToTimeDecimal(nonTimeDecimal) {
    return nonTimeDecimal % 1 !== 0
      ? Math.trunc(nonTimeDecimal) + 0.3
      : nonTimeDecimal
  }

  handleTimeChange([startTime, endTime], index) {
    startTime = this.roundToTimeDecimal(startTime)
    endTime = this.roundToTimeDecimal(endTime)
    this.props.setTimeRange(this.props.clubId, index, [startTime, endTime])
  }

  render() {
    let { clubId, timeRanges } = this.props
    return (
      <List component="div" disablePadding>
        {timeRanges.map((timeRange, i) => (
          <ListItem style={{ paddingLeft: 0 }}>
            <Checkbox
              checked={timeRange.model.active}
              onClick={() => this.handleToggleRange(clubId, i)}
            />
            <ListItemText
              primary={timeRange.label}
              secondary={`${timeRange.model.startTime.toFixed(
                2
              )} - ${timeRange.model.endTime.toFixed(2)}`}
            />
            {/* {timeRange.model.active && (
              <ListItemSecondaryAction
                style={{
                  marginLeft: 0,
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <EditOutlined
                  fontSize="small"
                  onClick={() => this.handleToggleExpanded(clubId, i)}
                />
              </ListItemSecondaryAction>
            )} */}
            <Slider
              onValueChange={this.handleTimeChange}
              model={{ ...timeRange.model, index: i }}
              picker={timeRange}
            />
            {/* <Collapse in={model.expanded} timeout="auto" unmountOnExit /> */}
          </ListItem>
        ))}
      </List>
    )
  }
}

TimeRanges.propTypes = {
  clubId: PropTypes.object.isRequired
}

const mapStateToProps = (state, props) => ({
  timeRanges: getClubTimeRanges(state, props.clubId)
})

export default connect(
  mapStateToProps,
  { toggleTimeRangeActive, setTimeRange }
)(withStyles(styles)(TimeRanges))
