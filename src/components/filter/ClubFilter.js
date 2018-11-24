import React, { Component } from 'react'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../../styles'
import {
  setFilterClubs,
  setFilterLocations,
  setStartDateAndTime,
  setEndDateAndTime,
  setTimeRangeFilter,
  toggleTimeFilterActive
} from '../../actions/slotFilter'
import LocationPicker from '../LocationPicker'
import MultiClubSelectPicker from '../slot-finder/MultiClubSelectPicker'
import DateAndTimePicker from '../DateAndTimePicker'
import TimeRangesPicker from '../time/TimeRangesPicker'
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
    this.handleRangeChange = this.handleRangeChange.bind(this)
    this.handleToggleRangeActive = this.handleToggleRangeActive.bind(this)
  }

  handleToggleRangeActive(timeRangeIndex) {
    this.props.toggleTimeFilterActive(timeRangeIndex)
  }

  handleRangeChange([startTime, endTime], index) {
    this.props.setTimeRangeFilter(index, startTime, endTime)
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
    return date.toISOString().substring(0, 10)
  }

  render() {
    const { clubs, settings } = this.props
    return (
      <div
        style={{
          marginTop: '24px',
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

        <TimeRangesPicker
          onRangeValueChange={this.handleRangeChange}
          onRangeActiveChange={this.handleToggleRangeActive}
          timeRanges={settings.timeRanges}
        />
      </div>
    )
  }
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
    setTimeRangeFilter,
    toggleTimeFilterActive
  }
)(withStyles(styles)(ClubFilter))
