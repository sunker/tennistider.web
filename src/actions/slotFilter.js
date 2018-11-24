import axios from 'axios'
import {
  SET_FILTER_LOCATIONS,
  SET_FILTERED_CLUBS,
  RECEIVE_SLOTS,
  SET_START_DATE_AND_TIME,
  SET_END_DATE_AND_TIME,
  SET_TIME_RANGE_FILTER,
  TOGGLE_TIME_RANGE_FILTER_ACTIVE
} from './types'

export const setFilterLocations = locations => dispatch => {
  dispatch({
    type: SET_FILTER_LOCATIONS,
    payload: locations
  })
}

// export const loadSlots = () => async (dispatch, getStore) => {
//   const { data } = await axios.get('/api/slot/upcoming')
//   const { club } = getStore()
//   const slots = data.map(s => {
//     const date = new Date(s.date)
//     date.setHours(s.startTime)
//     return {
//       ...s,
//       ...club.clubs.find(c => c.id === s.clubId),
//       date
//     }
//   })
//   dispatch({
//     type: RECEIVE_SLOTS,
//     payload: slots
//   })
// }

export const setFilterClubs = selectedClubIds => (dispatch, getStore) => {
  const clubs = getStore().club.clubs
  const selectedClubs = clubs
    .filter(c => selectedClubIds.includes(c.id))
    .map(c => ({ clubId: c.id, days: [] }))
  dispatch({
    type: SET_FILTERED_CLUBS,
    payload: selectedClubs
  })
}

export const setStartDateAndTime = value => dispatch => {
  dispatch({
    type: SET_START_DATE_AND_TIME,
    payload: value ? new Date(value) : new Date()
  })
}

export const setEndDateAndTime = value => dispatch => {
  dispatch({
    type: SET_END_DATE_AND_TIME,
    payload: value
      ? new Date(value)
      : new Date(new Date().setDate(new Date().getDate() + 14))
  })
}

export const toggleTimeFilterActive = index => dispatch => {
  dispatch({
    type: TOGGLE_TIME_RANGE_FILTER_ACTIVE,
    payload: { index }
  })
}

export const setTimeRangeFilter = (index, startTime, endTime) => dispatch => {
  dispatch({
    type: SET_TIME_RANGE_FILTER,
    payload: { index, value: { startTime, endTime, active: true } }
  })
}
