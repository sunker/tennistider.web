import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { loadSlots } from '../../actions/slotFilter'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../../styles'
import FilterIcon from '@material-ui/icons/FilterList'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import ClubFilter from '../filter/ClubFilter'
import SlotList from '../slot-finder/SlotList'
import { filteredSlots } from '../../selectors'
import Collapse from '@material-ui/core/Collapse'
import CircularProgress from '@material-ui/core/CircularProgress'

class SlotFinder extends Component {
  state = {
    open: false
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    }
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    })
  }

  handleChange = () => {
    this.setState(state => ({ open: !state.open }))
  }

  render() {
    const { classes, slots, settings } = this.props
    const { open } = this.state

    return (
      <Paper className={classes.paper}>
        <div
          style={{
            width: '100%',
            marginLeft: 0,
            alignItems: 'center',
            display: 'flex'
          }}
          onClick={this.handleChange}
        >
          <FilterIcon className={classes.icon} style={{ marginRight: 6 }} />
          <Typography variant="h6" style={{ marginLeft: 12 }}>
            {open ? 'Dölj filter' : 'Visa filter'}
          </Typography>
        </div>
        <Collapse in={open} style={{ width: '100%' }}>
          <ClubFilter />
        </Collapse>
        <Typography style={{ display: 'block' }} align="left">
          {slots.length} tider hittades
        </Typography>
        {settings.loading && (
          <React.Fragment>
            <CircularProgress />
            <p>Hämtar tider...</p>
          </React.Fragment>
        )}
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
  settings: state.settings,
  slots: filteredSlots(state)
})

export default connect(
  mapStateToProps,
  { loadSlots }
)(withStyles(styles)(SlotFinder))
