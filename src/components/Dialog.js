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
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import _ from 'lodash'
import DialogActions from '@material-ui/core/DialogActions'
import blue from '@material-ui/core/colors/blue'
import { DialogContent } from '@material-ui/core'

const emails = ['username@gmail.com', 'user02@gmail.com']
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
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <div style={{ width: 350 }}>
          <DialogContent>
            <List>
              {_.sortBy(slots, s => s.courtNumber).map(slot => (
                <ListItem
                  button
                  onClick={() => this.handleListItemClick(slot)}
                  key={slot.key}
                >
                  {/* <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <LinkIcon />
                    </Avatar>
                  </ListItemAvatar> */}
                  <ListItemText
                    primary={`Bana ${slot.courtNumber}`}
                    secondary={slot.surface}
                  />
                  {slot.link && (
                    <ListItemSecondaryAction style={{ marginLeft: 12 }}>
                      Gå till bokningssida
                      <IconButton aria-label="Comments">
                        <LinkIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              ))}
              {/* <ListItem
              button
              onClick={() => this.handleListItemClick('addAccount')}
            >
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="add account" />
            </ListItem> */}
            </List>
          </DialogContent>
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
