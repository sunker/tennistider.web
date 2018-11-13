import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import PropTypes from 'prop-types'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './setAuthToken'
import {
  setCurrentUser,
  logoutUser,
  loadInitialData
} from './actions/authentication'
import CssBaseline from '@material-ui/core/CssBaseline'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import FavouriteClub from './components/pages/FavouriteClub'
import SlotFinder from './components/pages/SlotFinder'
import Home from './components/Home'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import withStyles from '@material-ui/core/styles/withStyles'
import { layout, styles } from './styles'
import { createMuiTheme } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#4CAF50',
      contrastText: '#FFF'
    },
    secondary: {
      main: '#DE9B61',
      contrastText: '#FFF'
    }
  }
})

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))
  store.dispatch(loadInitialData())

  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    // let state = store.getState()
    // let loading = state.settings.loading
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={muiTheme}>
            <React.Fragment>
              <CssBaseline />
              <main className={this.props.classes.layout}>
                <div>
                  <Navbar />
                  <div className="container">
                    {/* {this.props.settings.loading ? (
                      <CircularProgress
                        style={{
                          display: 'block',
                          marginLeft: 'auto',
                          marginRight: 'auto'
                        }}
                        color="secondary"
                      />
                    ) : ( */}
                    <React.Fragment>
                      <Route exact path="/" component={Home} />
                      <Route
                        exact
                        path="/valj-klubbar"
                        component={FavouriteClub}
                      />
                      <Route
                        exact
                        path="/hitta-ledig-tid"
                        component={SlotFinder}
                      />
                    </React.Fragment>
                    {/* )} */}
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                  </div>
                </div>
              </main>
            </React.Fragment>
          </MuiThemeProvider>
        </Router>
      </Provider>
    )
  }
}

// App.propTypes = {
//   settings: PropTypes.object.isRequired
// }

// const mapStateToProps = state => ({
//   auth: state.auth,
//   settings: state.settings
// })

// export default connect(
//   mapStateToProps,
//   {}
// )(withStyles(styles)(App))
export default withStyles(styles)(App)
