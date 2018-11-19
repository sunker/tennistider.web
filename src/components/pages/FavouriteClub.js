import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../../styles'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { toggleFavouriteClub } from '../../actions/club'
import { saveFavouriteClubs, toggleLocation } from '../../actions/userSettings'
import LocationPicker from '../LocationPicker'
import MultiClubListPicker from '../MultiClubListPicker'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
  getClubsByLocationWithUserData,
  getLocationsWithUserData
} from '../../selectors'

class SelectFavouriteClubs extends Component {
  constructor() {
    super()
    this.handleClubToggle = this.handleClubToggle.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
  }
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    }
  }

  handleClubToggle(id) {
    this.props.toggleFavouriteClub(id)
  }

  handleSave() {
    this.props.saveFavouriteClubs()
  }

  handleLocationChange(event) {
    this.props.toggleLocation(event.target.value)
  }

  render() {
    const { classes, clubs } = this.props
    return (
      <Paper className={classes.paper}>
        {clubs.length === 0 ? (
          <React.Fragment>
            <CircularProgress style={{ marginTop: 48 }} />
            <p>Hämtar inställningar...</p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div
              style={{
                width: '100%',
                marginLeft: '24px',
                marginBottom: '24px'
              }}
            >
              <LocationPicker
                onValueChange={this.handleLocationChange}
                locations={this.props.locationsWithUserData}
              />
            </div>
            <MultiClubListPicker
              onValueChange={this.handleClubToggle}
              clubs={clubs}
            />

            <Button
              onClick={this.handleSave}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Spara
            </Button>
          </React.Fragment>
        )}
      </Paper>
    )
  }
}

SelectFavouriteClubs.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  toggleFavouriteClub: PropTypes.func.isRequired,
  saveFavouriteClubs: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  toggleLocation: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  settings: state.settings,
  clubs: getClubsByLocationWithUserData(state),
  locationsWithUserData: getLocationsWithUserData(state)
})

export default connect(
  mapStateToProps,
  { toggleFavouriteClub, saveFavouriteClubs, toggleLocation }
)(withStyles(styles)(SelectFavouriteClubs))
