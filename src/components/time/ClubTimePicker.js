import React, { Component } from 'react'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../../styles'
import PropTypes from 'prop-types'
import { toggleFavouriteClub } from '../../actions/club'
import { toggleLocation } from '../../actions/userSettings'
import ClubExpansionList from './ClubExpansionList'
import { getFavouriteClubsWithTimeRanges } from '../../selectors'

class ClubTimePicker extends Component {
  state = {
    clubs: []
  }
  constructor() {
    super()
    this.onExpand = this.onExpand.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
  }

  componentDidMount() {
    let { clubs } = this.props
    clubs = clubs.map(c => ({ ...c, expanded: false }))
    if (clubs && clubs.length > 0) {
      clubs[0].expanded = true
    }
    this.setState({ clubs })
  }

  componentWillReceiveProps(nextProps) {
    const clubs = nextProps.clubs.map(c => ({ ...c, expanded: false }))
    if (clubs && clubs.length > 0) {
      clubs[0].expanded = true
    }
    this.setState({ clubs })
  }

  onExpand(club) {
    this.setState(state => ({
      clubs: state.clubs.map(c => ({
        ...c,
        expanded: c.id === club.id ? !club.expanded : c.expanded
      }))
    }))
  }

  handleLocationChange(event) {
    this.props.toggleLocation(event.target.value)
  }

  render() {
    const { clubs } = this.state
    return (
      <React.Fragment>
        <div
          style={{
            width: '100%',
            marginLeft: '24px',
            marginBottom: '24px'
          }}
        />
        <ClubExpansionList onExpand={this.onExpand} clubs={clubs} />
      </React.Fragment>
    )
  }
}

ClubTimePicker.propTypes = {
  toggleFavouriteClub: PropTypes.func.isRequired,
  toggleLocation: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  clubs: getFavouriteClubsWithTimeRanges(state)
})

export default connect(
  mapStateToProps,
  { toggleFavouriteClub, toggleLocation }
)(withStyles(styles)(ClubTimePicker))
