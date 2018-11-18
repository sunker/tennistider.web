import React, { Component } from 'react'
import ListSubheader from '@material-ui/core/ListSubheader'
import _ from 'lodash'
import Divider from '@material-ui/core/Divider'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../styles'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import DaySlotsPerClub from './DaySlotsPerClub'
import { prettyDate } from '../dateUtils'

var divStyle = {
  width: '100%'
}

class SlotList extends Component {
  render() {
    const { slots } = this.props
    const days = _.groupBy(slots.sort(s => s.date), s =>
      new Date(s.date).getDate()
    )

    return (
      <List style={divStyle}>
        {Object.keys(days).map((day, i) => (
          <React.Fragment key={i}>
            <ListSubheader disableSticky={true} style={{ paddingLeft: 0 }}>
              {prettyDate(new Date(days[day][0].date))}
            </ListSubheader>
            <DaySlotsPerClub slots={days[day]} />
            <li>
              <Divider style={{ marginTop: '12px' }} />
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
