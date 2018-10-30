import { SET_LOCATIONS } from './types'

export const toggleLocation = locations => dispatch => {
  dispatch({
    type: SET_LOCATIONS,
    payload: locations
  })
}
