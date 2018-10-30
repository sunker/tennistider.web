import axios from 'axios'
import { SET_CLUBS, ADD_FAVOURITE_CLUB, REMOVE_FAVOURITE_CLUB } from './types'

export const getClubs = () => async dispatch => {
  const { data } = await axios.get('/api/club/list')
  dispatch({ type: SET_CLUBS, payload: data })
}

export const toggleFavouriteClub = (clubId, favourites) => (
  dispatch,
  getStore
) => {
  // const { data } = await axios.get('/api/club/list')
  const favourites = getStore().settings.clubs
  const club = favourites.find(c => c.clubId === clubId)
  dispatch({
    type: club ? REMOVE_FAVOURITE_CLUB : ADD_FAVOURITE_CLUB,
    payload: { clubId }
  })
}
