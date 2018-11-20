import axios from 'axios'
import {
  SET_LOCATIONS,
  RECEIVE_SETTINGS,
  TOGGLE_TIME_RANGE_ACTIVE,
  SET_TIME_RANGE,
  TOGGLE_CLUB_EXPAND
} from './types'

export const toggleLocation = locations => dispatch => {
  dispatch({
    type: SET_LOCATIONS,
    payload: locations
  })
}

export const saveFavouriteClubs = () => async (dispatch, getStore) => {
  let { locations, clubs } = getStore().settings
  clubs = clubs.map(c => {
    delete c.expanded
    return c
  })
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

export const setTimeRange = (
  clubId,
  timeRangeIndex,
  [startTime, endTime]
) => dispatch => {
  dispatch({
    type: SET_TIME_RANGE,
    payload: {
      clubId,
      timeRangeIndex,
      value: { startTime, endTime, active: true }
    }
  })
}

export const toggleClubExpand = clubId => dispatch => {
  dispatch({
    type: TOGGLE_CLUB_EXPAND,
    payload: {
      clubId
    }
  })
}
