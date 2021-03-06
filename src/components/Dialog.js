import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import LinkIcon from '@material-ui/icons/Link'
import ScheduleIcon from '@material-ui/icons/Schedule'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import _ from 'lodash'
import DialogActions from '@material-ui/core/DialogActions'
import blue from '@material-ui/core/colors/blue'

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
}

class SlotDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue)
  }

  handleListItemClick = value => {
    this.props.onClose(value)
  }

  render() {
    const { classes, onClose, slots, selectedValue, ...other } = this.props

    return (
      <Dialog
        root="true"
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle id="simple-dialog-title">
          {slots.length > 0
            ? slots[0].startTime.toFixed(2).toString() +
              '-' +
              slots[0].endTime.toFixed(2).toString()
            : ''}
        </DialogTitle>
        <div>
          <List>
            {_.sortBy(slots, s => s.courtName || s.courtNumber).map(slot => (
              <ListItem button key={slot.key}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <ScheduleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  style={{ width: 350 }}
                  primary={
                    slot.courtName
                      ? slot.courtName === 'unknowncourt'
                        ? 'Okänt nummer på banan'
                        : slot.courtName
                      : `Bana ${slot.courtNumber}`
                  }
                  secondary={slot.surface}
                />
                {slot.link && (
                  <a
                    style={{ color: 'rgba(0, 0, 0, 0.87)' }}
                    href={slot.link}
                    target="_blank"
                  >
                    <ListItemSecondaryAction
                      onClick={() => this.handleListItemClick(slot)}
                      style={{ marginLeft: 12 }}
                    >
                      Boka
                      <IconButton aria-label="Comments">
                        <LinkIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </a>
                )}
              </ListItem>
            ))}
          </List>
          <DialogActions>
            <Button align="left" onClick={this.handleClose} color="primary">
              Avbryt
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    )
  }
}

SlotDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  slots: PropTypes.array.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string
}

export default withStyles(styles)(SlotDialog)
