import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import ListSubheader from '@material-ui/core/ListSubheader'
import { connect } from 'react-redux'
import _ from 'lodash'
import Divider from '@material-ui/core/Divider'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../styles'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Avatar from '@material-ui/core/Avatar'
import DaySlots from './DaySlots'

var divStyle = {
  width: '100%'
}

class SlotList extends Component {
  render() {
    const { slots } = this.props
    const days = _.groupBy(slots.sort(s => s.date), s =>
      new Date(s.date).getDate()
    )
    console.log(days)
    return (
      <List style={divStyle}>
        {Object.keys(days).map((day, i) => (
          <React.Fragment key={i}>
            <ListSubheader>{days[day][0].date}</ListSubheader>
            <DaySlots slots={days[day]} />
            <li>
              <Divider />
            </li>
          </React.Fragment>
        ))}
      </List>
    )
  }
}

SlotList.propTypes = {
  slots: PropTypes.array.isRequired
}

export default withStyles(styles)(SlotList)
