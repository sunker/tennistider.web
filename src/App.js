import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
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
import FavouriteClub from './components/club_monitoring/FavouriteClub'
import SlotFinder from './components/pages/SlotFinder'
import MonitoringConfig from './components/pages/MonitoringConfig'
import Home from './components/Home'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from './styles'
import { createMuiTheme } from '@material-ui/core/styles'
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
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={muiTheme}>
            <React.Fragment>
              <CssBaseline />
              <main className={this.props.classes.layout}>
                <div>
                  <div className="container">
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
                      <Route exact path="/test" component={MonitoringConfig} />
                    </React.Fragment>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />

                    <Navbar />
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

export default withStyles(styles)(App)
