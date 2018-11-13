import {
  ADD_FAVOURITE_CLUB,
  REMOVE_FAVOURITE_CLUB,
  RECEIVE_SETTINGS,
  REMOVE_LOCATION,
  ADD_LOCATION,
  SET_LOCATIONS,
  LOADING_INITIAL_DATA_CHANGED
} from '../actions/types'

const initialState = {
  loading: false,
  clubs: [],
  locations: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_SETTINGS:
      return {
        ...state,
        ...action.payload
      }
    case ADD_FAVOURITE_CLUB:
      return {
        ...state,
        clubs: [...state.clubs, action.payload]
      }
    case REMOVE_FAVOURITE_CLUB:
      return {
        ...state,
        clubs: state.clubs.filter(f => f.clubId !== action.payload.clubId)
      }
    case ADD_LOCATION:
      return {
        ...state,
        locations: [...state.locations, action.payload]
      }
    case REMOVE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(l => l !== action.payload)
      }
    case SET_LOCATIONS:
      return {
        ...state,
        locations: action.payload
      }
    case LOADING_INITIAL_DATA_CHANGED:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}
