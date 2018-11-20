import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import _ from 'lodash'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import { styles } from '../../styles'
import { saveFavouriteClubs } from '../../actions/userSettings'
import FavouriteClub from '../FavouriteClub'
import ClubTimePicker from '../ClubTimePicker'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

function LinkTab(props) {
  return (
    <Tab component="a" onClick={event => event.preventDefault()} {...props} />
  )
}
class MonitoringConfig extends React.Component {
  state = {
    value: -1
  }

  tabs = {
    klubbar: 0,
    tider: 1,
    enskildBevakning: 2
  }

  constructor() {
    super()
    this.handleSave = this.handleSave.bind(this)
  }

  async componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    }

    const tab =
      new URLSearchParams(this.props.location.search).get('tab') || 'klubbar'
    if (this.tabs.hasOwnProperty(tab)) {
      this.setState({ value: this.tabs[tab] })
    }
  }

  handleChange = (event, value) => {
    this.props.history.push({
      search: `?tab=${_.invert(this.tabs)[value]}`
    })
    this.setState({ value })
  }

  handleSave() {
    this.props.saveFavouriteClubs()
  }

  render() {
    const { classes, settings } = this.props

    return (
      <Paper className={classes.paper}>
        <Tabs
          style={{ width: '100%', marginBottom: 24 }}
          fullWidth
          value={this.state.value}
          onChange={this.handleChange}
        >
          <LinkTab label="Klubbar" />
          <LinkTab label="Tider" href="page2" />
          <LinkTab label="Enskild bevakning" href="page3" />
        </Tabs>
        {settings.loading && (
          <React.Fragment>
            <CircularProgress style={{ marginTop: 48 }} />
            <p>Hämtar inställningar...</p>
          </React.Fragment>
        )}

        {this.state.value === 0 && <FavouriteClub />}
        {this.state.value === 1 && <ClubTimePicker />}

        {!this.state.loading && (
          <Button
            onClick={this.handleSave}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Spara
          </Button>
        )}
      </Paper>
    )
  }
}

MonitoringConfig.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  saveFavouriteClubs: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  settings: state.settings
})

export default connect(
  mapStateToProps,
  { saveFavouriteClubs }
)(withStyles(styles)(MonitoringConfig))
