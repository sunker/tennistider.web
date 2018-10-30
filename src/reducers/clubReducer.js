import { SET_CLUBS } from '../actions/types'

const initialState = {
  clubs: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CLUBS:
      return {
        ...state,
        clubs: action.payload
      }
    default:
      return state
  }
}
