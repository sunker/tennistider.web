import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../../styles'
import PropTypes from 'prop-types'
import { loadSlots } from '../../actions/slotFilter'
import ClubFilter from '../filter/ClubFilter'
import { filteredSlots } from '../../selectors'

class SlotFinder extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    } else {
      this.props.loadSlots()
    }
  }

  render() {
    const { classes, slots } = this.props
    return (
      <Paper className={classes.paper}>
        <ClubFilter />
        <hr />
        {slots.map(s => (
          <p>{s.clubName}</p>
        ))}
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
