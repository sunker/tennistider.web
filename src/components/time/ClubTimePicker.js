import React, { Component } from 'react'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../../styles'
import PropTypes from 'prop-types'
import { toggleClubExpand } from '../../actions/userSettings'
import ClubExpansionList from './ClubExpansionList'
import { getFavouriteClubsWithTimeRanges } from '../../selectors'

class ClubTimePicker extends Component {
  state = {
    clubs: []
  }
  constructor() {
    super()
    this.onExpandClub = this.onExpandClub.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
  }

  onExpandClub(club) {
    this.props.toggleClubExpand(club.id)
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
        />
        <ClubExpansionList onExpand={this.onExpandClub} clubs={clubs} />
      </React.Fragment>
    )
  }
}

ClubTimePicker.propTypes = {
  toggleClubExpand: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  clubs: getFavouriteClubsWithTimeRanges(state)
})

export default connect(
  mapStateToProps,
  { toggleClubExpand }
)(withStyles(styles)(ClubTimePicker))
