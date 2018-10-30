import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../../styles'
import PropTypes from 'prop-types'
import { getClubs, toggleFavouriteClub } from '../../actions/club'
import LocationPicker from '../LocationPicker'
import MultiClubPicker from '../MultiClubPicker'
import { getClubsByLocationWithUserData } from '../../selectors'

class SelectFavouriteClubs extends Component {
  constructor() {
    super()
    this.handleClubToggle = this.handleClubToggle.bind(this)
  }
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    } else {
      this.props.getClubs()
    }
  }

  handleClubToggle(id) {
    this.props.toggleFavouriteClub(id)
  }

  render() {
    const { classes, clubs } = this.props
    return (
      <Paper className={classes.paper}>
        <div
          style={{
            width: '100%',
            marginLeft: '24px',
            marginBottom: '24px'
          }}
        >
          <LocationPicker />
        </div>
        <MultiClubPicker onValueChange={this.handleClubToggle} clubs={clubs} />
      </Paper>
    )
  }
}

SelectFavouriteClubs.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getClubs: PropTypes.func.isRequired,
  toggleFavouriteClub: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  settings: state.settings,
  clubs: getClubsByLocationWithUserData(state)
})

export default connect(
  mapStateToProps,
  { toggleFavouriteClub, getClubs }
)(withStyles(styles)(SelectFavouriteClubs))
