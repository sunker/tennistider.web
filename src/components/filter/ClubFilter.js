import React, { Component } from 'react'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../../styles'
import PropTypes from 'prop-types'
import { setFilterClubs, setFilterLocations } from '../../actions/slotFilter'
import LocationPicker from '../LocationPicker'
import MultiClubSelectPicker from '../MultiClubSelectPicker'
import {
  getClubsByLocationWithUserData,
  getLocationsWithUserData
} from '../../selectors'
import { flattenProp } from 'recompose'

class ClubFilter extends Component {
  constructor() {
    super()
    this.handleClubFilterToggle = this.handleClubFilterToggle.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
  }

  handleClubFilterToggle(event) {
    this.props.setFilterClubs(event.target.value)
  }

  handleLocationChange(event) {
    this.props.setFilterLocations(event.target.value)
  }

  render() {
    const { clubs } = this.props
    return (
      <div
        style={{
          width: '90%',
          marginLeft: '24px',
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
      </div>
    )
  }
}

ClubFilter.propTypes = {
  setFilterClubs: PropTypes.func.isRequired,
  setFilterLocations: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  clubs: getClubsByLocationWithUserData(state, true),
  locationsWithUserData: getLocationsWithUserData(state, true)
})

export default connect(
  mapStateToProps,
  { setFilterClubs, setFilterLocations }
)(withStyles(styles)(ClubFilter))
