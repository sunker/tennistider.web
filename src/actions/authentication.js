import axios from 'axios'
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  RECEIVE_SETTINGS,
  LOADING_INITIAL_DATA_CHANGED,
  SET_CLUBS,
  INIT_SLOT_FILTER_SETTINGS,
  RECEIVE_SLOTS,
  LOGOUT
} from './types'
import setAuthToken from '../setAuthToken'
import jwt_decode from 'jwt-decode'

export const registerUser = (user, history) => dispatch => {
  axios
    .post('/api/users/register', user)
    .then(res => history.push('/login'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const loginUser = user => dispatch => {
  axios
    .post('/api/users/login', user)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwt_decode(token)
      let { locations, clubSettings: clubs, ...jwt } = decoded
      locations = locations.length > 0 ? locations : ['Stockholm']
      dispatch(setCurrentUser(jwt))
      loadInitialData()
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const loadInitialData = () => async (dispatch, getStore) => {
  console.log(getStore().club.clubs.length)
  if (getStore().club.clubs.length === 0) {
    dispatch({ type: LOADING_INITIAL_DATA_CHANGED, payload: true })
    let [user, clubs, slots] = await Promise.all([
      axios.get('/api/users/me'),
      axios.get('/api/club/list'),
      axios.get('/api/slot/upcoming')
    ])
    dispatch({ type: SET_CLUBS, payload: clubs.data })
    const locations =
      !user.data.locations || user.data.locations.length === 0
        ? ['Stockholm']
        : user.data.locations
    dispatch({
      type: RECEIVE_SETTINGS,
      payload: {
        locations,
        clubs: user.data.slotPreference
      }
    })
    dispatch({
      type: INIT_SLOT_FILTER_SETTINGS,
      payload: {
        locations,
        clubs: user.data.slotPreference,
        initialized: true
      }
    })
    slots = slots.data.map(s => {
      const date = new Date(s.date)
      date.setHours(Math.trunc(s.startTime))
      const narray = s.startTime.toString().split('.')
      const result = narray.length > 1 ? `${narray[1]}0` : '0.0'
      date.setMinutes(Number(result))
      date.setSeconds(0)
      date.setMilliseconds(0)
      return {
        ...s,
        ...clubs.data.find(c => c.id === s.clubId),
        date
      }
    })
    dispatch({
      type: RECEIVE_SLOTS,
      payload: slots
    })
    dispatch({ type: LOADING_INITIAL_DATA_CHANGED, payload: false })
  }
}

export const setCurrentUser = decoded => dispatch => {
  let { locations, clubSettings: clubs, ...jwt } = decoded
  locations = !locations || locations.length === 0 ? ['Stockholm'] : locations
  clubs = !clubs ? [] : clubs
  dispatch({
    type: SET_CURRENT_USER,
    payload: jwt
  })

  dispatch({
    type: RECEIVE_SETTINGS,
    payload: { locations, clubs }
  })
}

export const logoutUser = history => dispatch => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
  dispatch({
    type: RECEIVE_SETTINGS,
    payload: {
      locations: [],
      clubs: []
    }
  })
  dispatch({
    type: INIT_SLOT_FILTER_SETTINGS,
    payload: {
      locations: [],
      clubs: [],
      initialized: false
    }
  })
  dispatch({ type: SET_CLUBS, payload: [] })
  dispatch({
    type: RECEIVE_SLOTS,
    payload: []
  })
  history.push('/login')
}
