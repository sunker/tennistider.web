import React, { Component } from 'react'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../../styles'
import PropTypes from 'prop-types'
import { toggleFavouriteClub } from '../../actions/club'
import { toggleLocation } from '../../actions/userSettings'
import LocationPicker from '../LocationPicker'
import MultiClubListPicker from './MultiClubListPicker'
import {
  getClubsByLocationWithUserData,
  getLocationsWithUserData
} from '../../selectors'

class SelectFavouriteClubs extends Component {
  constructor() {
    super()
    this.handleClubToggle = this.handleClubToggle.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
  }

  handleClubToggle(id) {
    this.props.toggleFavouriteClub(id)
  }

  handleLocationChange(event) {
    this.props.toggleLocation(event.target.value)
  }

  render() {
    const { clubs } = this.props
    return (
      <React.Fragment>
        <div
          style={{
            width: '100%',
            marginLeft: '24px',
            marginBottom: '24px'
          }}
        >
          {this.props.locationsWithUserData.length > 0 && (
            <LocationPicker
              onValueChange={this.handleLocationChange}
              locations={this.props.locationsWithUserData}
            />
          )}
        </div>
        <MultiClubListPicker
          onValueChange={this.handleClubToggle}
          clubs={clubs}
        />
      </React.Fragment>
    )
  }
}

SelectFavouriteClubs.propTypes = {
  toggleFavouriteClub: PropTypes.func.isRequired,
  toggleLocation: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  clubs: getClubsByLocationWithUserData(state),
  locationsWithUserData: getLocationsWithUserData(state)
})

export default connect(
  mapStateToProps,
  { toggleFavouriteClub, toggleLocation }
)(withStyles(styles)(SelectFavouriteClubs))
