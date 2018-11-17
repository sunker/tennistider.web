import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../styles'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Avatar from '@material-ui/core/Avatar'

var divStyle = {
  width: '100%'
}

class MultiClubListPicker extends Component {
  render() {
    const { clubs } = this.props
    return (
      <List style={divStyle}>
        {clubs.map(club => (
          <ListItem
            key={club.id}
            style={{ margin: 0, height: 66, paddingLeft: 0, paddingRight: 0 }}
          >
            <Avatar alt={club.name} src={`/img/${club.image}`} />
            <ListItemText primary={club.name} secondary={club.location} />
            <ListItemSecondaryAction>
              <Checkbox
                onChange={() => this.props.onValueChange(club.id)}
                checked={club.selected}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    )
  }
}

MultiClubListPicker.propTypes = {
  classes: PropTypes.object.isRequired,
  onValueChange: PropTypes.func.isRequired
}

export default withStyles(styles)(MultiClubListPicker)
