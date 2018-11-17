import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { loadSlots } from '../../actions/slotFilter'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../../styles'
import PropTypes from 'prop-types'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ClubFilter from '../filter/ClubFilter'
import SlotList from '../SlotList'
import { filteredSlots } from '../../selectors'

class SlotFinder extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    }
  }

  render() {
    const { classes, slots } = this.props
    return (
      <Paper className={classes.paper}>
        <ExpansionPanel
          style={{
            width: '100%'
          }}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Filter</Typography>
          </ExpansionPanelSummary>
          <ClubFilter />
        </ExpansionPanel>
        <hr />
        <SlotList slots={slots} />
      </Paper>
    )
  }
}

SlotFinder.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  slots: PropTypes.array.isRequired,
  loadSlots: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  slots: filteredSlots(state)
})

export default connect(
  mapStateToProps,
  { loadSlots }
)(withStyles(styles)(SlotFinder))
