import React, { Component } from 'react'
import _ from 'lodash'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../styles'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import SlotsPerClubAndDay from './SlotsPerClubAndDay'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import { Divider } from '@material-ui/core'

class DaySlotsPerClub extends Component {
  render() {
    let { slots } = this.props
    const clubs = _.groupBy(slots, s => s.clubId)
    return (
      <React.Fragment>
        {Object.keys(clubs).map((clubId, id) => (
          <div key={id}>
            <ListItem
              key={id}
              style={{
                margin: 0,
                height: 'auto',
                paddingLeft: 0,
                paddingRight: 0
              }}
            >
              <Avatar
                alt={clubId.name}
                src={`/img/${clubs[clubId][0].image}`}
              />
              <ListItemText
                className={'slot-list-item-text'}
                primary={clubs[clubId][0].name}
              />
            </ListItem>
            <SlotsPerClubAndDay slots={_.sortBy(clubs[clubId], 'startTime')} />
          </div>
        ))}
      </React.Fragment>
    )
  }
}

DaySlotsPerClub.propTypes = {
  slots: PropTypes.array.isRequired
}

export default withStyles(styles)(DaySlotsPerClub)
