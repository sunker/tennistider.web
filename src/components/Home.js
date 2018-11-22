import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../styles'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

class Home extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/logga-in')
    }
  }
  render() {
    return (
      <Paper className={this.props.classes.paper}>
        <h1>hej</h1>
        <Link className="nav-link" to="/valj-klubbar">
          <Button type="submit" fullWidth variant="contained" color="primary">
            Välj favoritklubbar
          </Button>
        </Link>
        <Link className="nav-link" to="/hitta-tider">
          <Button type="submit" fullWidth variant="contained" color="primary">
            Hitta ledig tid
          </Button>
        </Link>
        <Link className="nav-link" to="/bevakningar?tab=klubbar">
          <Button type="submit" fullWidth variant="contained" color="primary">
            Hitta ledig tid
          </Button>
        </Link>
      </Paper>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(Home))
