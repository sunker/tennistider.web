import axios from 'axios'
import {
  SET_FILTER_LOCATIONS,
  SET_FILTERED_CLUBS,
  SET_START_DATE_AND_TIME,
  SET_END_DATE_AND_TIME,
  SET_TIME_RANGE_FILTER,
  TOGGLE_TIME_RANGE_FILTER_ACTIVE,
  SET_FILTERED_SPORTS
} from './types'

export const setFilterLocations = locations => dispatch => {
  dispatch({
    type: SET_FILTER_LOCATIONS,
    payload: locations
  })
}

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

export const setFilterSports = selectedSports => (dispatch, getStore) => {
  dispatch({
    type: SET_FILTERED_SPORTS,
    payload: selectedSports
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
