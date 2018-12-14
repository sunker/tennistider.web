import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../styles'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { filteredSlots } from '../selectors'
import { logoutUser } from '../actions/authentication'
import CircularProgress from '@material-ui/core/CircularProgress'
import SlotChart from './chart/SlotChart'

const FirstTimeUser = ({ slots, filteredSlots }) => {
  return (
    <React.Fragment>
      <h2>Du bevakar inga klubbar</h2>
      <Link style={{ textDecoration: 'none' }} to="/bevakningar?tab=klubbar">
        <Button type="submit" fullWidth variant="contained" color="primary">
          Skapa din första bevakning >>
        </Button>
      </Link>
      <hr />
      <h2 align="center">
        Det finns <em>{slots.length}</em> lediga tider
      </h2>
      <Link style={{ textDecoration: 'none' }} to="/hitta-tider">
        <Button type="submit" fullWidth variant="contained" color="primary">
          Hitta en som passar dig >>
        </Button>
      </Link>
    </React.Fragment>
  )
}

const NotFirstTimeUser = ({ filteredSlots }) => (
  <React.Fragment>
    <Link
      align="center"
      style={{ textDecoration: 'none' }}
      to="/bevakningar?tab=klubbar"
    >
      <Button type="submit" fullWidth variant="contained" color="primary">
        Gå till bevakningar >>
      </Button>
    </Link>
    <hr />

    <h2 align="center">
      Det finns <em>{filteredSlots.length}</em> tider som passar dina filter
    </h2>
    <Link style={{ textDecoration: 'none' }} to="/hitta-tider">
      <Button type="submit" fullWidth variant="contained" color="primary">
        Visa alla >>
      </Button>
    </Link>
  </React.Fragment>
)

class Home extends Component {
  constructor() {
    super()
    this.onLogout = this.onLogout.bind(this)
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/logga-in')
    }
  }

  onLogout(e) {
    e.preventDefault()
    this.props.logoutUser(this.props.history)
  }

  render() {
    const { settings, filteredSlots } = this.props
    const activeClubs = settings.clubs.filter(
      c => c.clubId !== -1 && !c.inactivated
    )
    return (
      <Paper className={this.props.classes.paper}>
        {settings.loading ? (
          <React.Fragment>
            <CircularProgress color="secondary" />
            <p>Laddar profil...</p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeClubs.length !== 0 && (
              <React.Fragment>
                <h2>Nästa sju dagar</h2>
                <SlotChart slots={filteredSlots} />
                <h2>
                  Du bevakar just nu <em>{activeClubs.length}</em> klubbar
                </h2>
              </React.Fragment>
            )}

            {activeClubs.length === 0 ? (
              <FirstTimeUser {...this.props} />
            ) : (
              <NotFirstTimeUser {...this.props} />
            )}

            <a
              onClick={this.onLogout}
              align="right"
              style={{ marginTop: 64 }}
              href=""
              className="nav-link"
            >
              {/* <img
                src={auth.user.avatar}
                alt={auth.user.email}
                title={auth.user.name}
                className="rounded-circle"
                style={{ width: '25px', marginRight: '5px' }}
              /> */}
              Logga ut
            </a>
          </React.Fragment>
        )}
      </Paper>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  settings: state.settings,
  slots: state.slot.slots,
  filteredSlots: filteredSlots(state)
})

export default connect(
  mapStateToProps,
  { logoutUser }
)(withStyles(styles)(Home))
