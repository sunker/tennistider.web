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
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

var divStyle = {
  width: '100%'
}

class ExpansionList extends Component {
  state = {
    clubs: []
  }
  constructor(props) {
    super()
    this.setState({
      clubs: props.clubs.map(c => ({ ...c, expanded: false }))
    })
  }

  handleClick = club => {
    this.setState(state => ({
      clubs: state.clubs.map(c => ({
        ...c,
        expanded: c.id === club.id ? !club.expanded : c.expanded
      }))
    }))
  }

  render() {
    let { clubs, onExpand } = this.props
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
              <Avatar alt={club.name} src={`/img/${club.image}`} />
              <ListItemText primary={club.name} secondary={club.location} />
              {club.expanded ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={club.expanded} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button>
                  <Checkbox checked={false} />
                  <ListItemText inset primary="Mornar" />
                </ListItem>
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    )
  }
}

ExpansionList.propTypes = {
  classes: PropTypes.object.isRequired,
  onExpand: PropTypes.func.isRequired,
  clubs: PropTypes.array.isRequired
}

export default withStyles(styles)(ExpansionList)
