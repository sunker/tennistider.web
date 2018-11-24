import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
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
      this.props.history.push('/logga-in')
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
    const { classes, slots, loading } = this.props
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
        <Typography style={{ marginTop: 24 }} align="left">
          {!loading && `${slots.length} tider hittades`}
        </Typography>
        {loading && (
          <React.Fragment>
            <CircularProgress color="secondary" />
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
  slots: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  settings: state.settings,
  loading: state.slot.loading,
  slots: filteredSlots(state)
})

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(SlotFinder))
