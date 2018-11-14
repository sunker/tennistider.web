import axios from 'axios'
import {
  SET_FILTER_LOCATIONS,
  SET_FILTERED_CLUBS,
  RECEIVE_SLOTS
} from './types'

export const setFilterLocations = locations => dispatch => {
  dispatch({
    type: SET_FILTER_LOCATIONS,
    payload: locations
  })
}

export const loadSlots = () => async (dispatch, getStore) => {
  const { data } = await axios.get('/api/slot/upcoming')
  console.log(data)
  const { club } = getStore()
  const slots = data.map(s => ({
    ...s,
    ...club.clubs.find(c => c.id === s.clubId)
  }))
  dispatch({
    type: RECEIVE_SLOTS,
    payload: slots
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
