import React, { Component } from 'react'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../../styles'
import PropTypes from 'prop-types'
import {
  setFilterClubs,
  setFilterLocations,
  setStartDateAndTime,
  setEndDateAndTime,
  setTimeFilter
} from '../../actions/slotFilter'
import { MorningPickerSettings } from '../../slotDefaults'
import LocationPicker from '../LocationPicker'
import MultiClubSelectPicker from '../MultiClubSelectPicker'
import DateAndTimePicker from '../DateAndTimePicker'
import Slider from '../Slider'
import {
  getClubsByLocationWithUserData,
  getLocationsWithUserData
} from '../../selectors'

class ClubFilter extends Component {
  constructor() {
    super()
    this.handleClubFilterToggle = this.handleClubFilterToggle.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.handleStartDateAndTimeChange = this.handleStartDateAndTimeChange.bind(
      this
    )
    this.handleEndDateAndTimeChange = this.handleEndDateAndTimeChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
  }

  handleClubFilterToggle(event) {
    this.props.setFilterClubs(event.target.value)
  }

  handleLocationChange(event) {
    this.props.setFilterLocations(event.target.value)
  }

  handleEndDateAndTimeChange(event) {
    this.props.setEndDateAndTime(event.target.value)
  }

  handleStartDateAndTimeChange(event) {
    this.props.setStartDateAndTime(event.target.value)
  }

  handleTimeChange(value, index) {
    this.props.setTimeFilter(index, value)
  }

  formatDateAndTime(date) {
    return date.toISOString().substring(0, 16)
  }

  render() {
    const { clubs, settings } = this.props
    return (
      <div
        style={{
          marginBottom: '24px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <LocationPicker
          onValueChange={this.handleLocationChange}
          locations={this.props.locationsWithUserData}
        />
        <MultiClubSelectPicker
          onValueChange={this.handleClubFilterToggle}
          clubs={clubs}
        />
        <DateAndTimePicker
          onValueChange={this.handleStartDateAndTimeChange}
          label={'Startdatum'}
          value={this.formatDateAndTime(settings.startDate)}
        />
        <DateAndTimePicker
          onValueChange={this.handleEndDateAndTimeChange}
          label={'Slutdatum'}
          value={this.formatDateAndTime(settings.endDate)}
        />
        <Slider
          model={{ ...settings.timeRanges[0], index: 0 }}
          picker={MorningPickerSettings}
          onValueChange={this.handleTimeChange}
        />
      </div>
    )
  }
}

ClubFilter.propTypes = {
  setFilterClubs: PropTypes.func.isRequired,
  setFilterLocations: PropTypes.func.isRequired,
  setTimeFilter: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  settings: state.slot.settings,
  clubs: getClubsByLocationWithUserData(state, true),
  locationsWithUserData: getLocationsWithUserData(state, true)
})

export default connect(
  mapStateToProps,
  {
    setFilterClubs,
    setFilterLocations,
    setStartDateAndTime,
    setEndDateAndTime,
    setTimeFilter
  }
)(withStyles(styles)(ClubFilter))
