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
import { toggleTimeRangeActive } from '../../actions/userSettings'
import { getClubTimeRanges } from '../../selectors'

class TimeRanges extends Component {
  constructor() {
    super()
    // this.handleLocationChange = this.handleLocationChange.bind(this)
  }

  handleToggleRange(clubId, timeRanges) {
    this.props.toggleTimeRangeActive(clubId, timeRanges)
  }
  // handleClick = club => {
  //   this.setState(state => ({
  //     clubs: state.clubs.map(c => ({
  //       ...c,
  //       expanded: c.id === club.id ? !club.expanded : c.expanded
  //     }))
  //   }))
  // }

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
            <ListItemText primary={timeRange.label} />
            {timeRange.model.active && (
              <ListItemSecondaryAction
                style={{
                  marginLeft: 0,
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <EditOutlined fontSize="small" />
              </ListItemSecondaryAction>
            )}
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
  { toggleTimeRangeActive }
)(withStyles(styles)(TimeRanges))
