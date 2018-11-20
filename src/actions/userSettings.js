import axios from 'axios'
import {
  SET_LOCATIONS,
  RECEIVE_SETTINGS,
  TOGGLE_TIME_RANGE_ACTIVE
} from './types'

export const toggleLocation = locations => dispatch => {
  dispatch({
    type: SET_LOCATIONS,
    payload: locations
  })
}

export const saveFavouriteClubs = () => async (dispatch, getStore) => {
  const { locations, clubs } = getStore().settings
  const { data } = await axios.post('/api/club/list', { locations, clubs })
  dispatch({
    type: RECEIVE_SETTINGS,
    payload: { locations, clubs: data }
  })
}

export const toggleTimeRangeActive = (clubId, timeRangeIndex) => async (
  dispatch,
  getStore
) => {
  dispatch({
    type: TOGGLE_TIME_RANGE_ACTIVE,
    payload: { clubId, timeRangeIndex }
  })
}
