import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authentication'

import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

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
            <div>
              <Navbar />
              <Route exact path="/" component={Home} />
              <div className="container">
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </div>
            </div>
          </MuiThemeProvider>
        </Router>
      </Provider>
    )
  }
}

export default App
