import React, { Component } from 'react'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../../styles'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import TimeRangesPicker from './TimeRangesPicker'
import { getClubTimeRanges } from '../../selectors'
import { toggleTimeRangeActive, setTimeRange } from '../../actions/userSettings'

var divStyle = {
  width: '100%'
}

class ClubExpansionList extends Component {
  state = {
    clubs: []
  }
  constructor() {
    super()
    this.handleRangeChange = this.handleRangeChange.bind(this)
    this.handleToggleRangeActive = this.handleToggleRangeActive.bind(this)
  }

  handleToggleRangeActive(timeRangeIndex, clubId) {
    this.props.toggleTimeRangeActive(clubId, timeRangeIndex)
  }

  handleRangeChange([startTime, endTime], index, clubId) {
    this.props.setTimeRange(clubId, index, [startTime, endTime])
  }

  render() {
    let { clubs, onExpand, settings } = this.props
    return (
      <List style={divStyle}>
        {clubs.map(club => (
          <React.Fragment key={club.clubId}>
            <ListItem
              key={club.clubId}
              style={{ margin: 0, height: 66, paddingLeft: 0, paddingRight: 0 }}
              button
              onClick={() => onExpand(club)}
            >
              <Avatar
                alt={club.name}
                src={club.imageSrc ? club.imageSrc : `/img/${club.image}`}
              />
              <ListItemText primary={club.name} secondary={club.location} />
              {club.expanded ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={club.expanded} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <TimeRangesPicker
                  onRangeValueChange={this.handleRangeChange}
                  onRangeActiveChange={this.handleToggleRangeActive}
                  timeRanges={getClubTimeRanges(settings, club.clubId)}
                  clubId={club.clubId}
                />
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    )
  }
}

ClubExpansionList.propTypes = {
  classes: PropTypes.object.isRequired,
  onExpand: PropTypes.func.isRequired,
  clubs: PropTypes.array.isRequired
}

const mapStateToProps = (state, props) => ({
  settings: state.settings
})

export default connect(mapStateToProps, {
  toggleTimeRangeActive,
  setTimeRange
})(withStyles(styles)(ClubExpansionList))
