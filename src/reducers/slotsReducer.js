import {
  INIT_SLOT_FILTER_SETTINGS,
  SET_FILTER_LOCATIONS,
  RECEIVE_SLOTS,
  SET_FILTERED_CLUBS
} from '../actions/types'

const initialState = {
  slots: [],
  settings: {
    clubs: [],
    locations: []
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case INIT_SLOT_FILTER_SETTINGS:
      return {
        ...state,
        settings: action.payload
      }
    case RECEIVE_SLOTS:
      return {
        ...state,
        slots: action.payload
      }
    case SET_FILTERED_CLUBS:
      return {
        ...state,
        settings: {
          ...state.settings,
          clubs: action.payload
        }
      }
    case SET_FILTER_LOCATIONS:
      return {
        ...state,
        settings: {
          ...state.settings,
          locations: action.payload
        }
      }
    default:
      return state
  }
}
