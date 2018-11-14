import React, { Component } from 'react'
import _ from 'lodash'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../styles'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Avatar from '@material-ui/core/Avatar'

var divStyle = {
  width: '100%'
}

class DaySlots extends Component {
  render() {
    let { slots } = this.props
    const clubs = _.groupBy(slots, s => s.clubId)
    console.log(clubs)
    return (
      <React.Fragment>
        {Object.keys(clubs).map((clubId, id) => (
          <ListItem
            key={id}
            style={{ margin: 0, height: 66, paddingLeft: 0, paddingRight: 0 }}
          >
            <Avatar alt={clubId.name} src={`/img/${clubs[clubId][0].image}`} />
            <ListItemText
              primary={clubs[clubId][0].name}
              secondary={clubs[clubId].location}
            />
          </ListItem>
        ))}
      </React.Fragment>
    )
  }
}

DaySlots.propTypes = {
  slots: PropTypes.array.isRequired,
  clubs: PropTypes.array.isRequired
}

export default withStyles(styles)(DaySlots)
