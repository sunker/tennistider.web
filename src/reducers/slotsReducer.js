import {
  INIT_SLOT_FILTER_SETTINGS,
  SET_FILTER_LOCATIONS,
  RECEIVE_SLOTS,
  SET_FILTERED_CLUBS,
  SET_START_DATE_AND_TIME,
  SET_END_DATE_AND_TIME,
  SET_TIME_RANGE_FILTER,
  TOGGLE_TIME_RANGE_FILTER_ACTIVE
} from '../actions/types'
import { DefaultTimeRangePickers } from '../slotDefaults'

const initialState = {
  slots: [],
  settings: {
    clubs: [],
    locations: [],
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 14)),
    timeRanges: DefaultTimeRangePickers
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case INIT_SLOT_FILTER_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload
        }
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
    case SET_START_DATE_AND_TIME:
      return {
        ...state,
        settings: {
          ...state.settings,
          startDate: action.payload
        }
      }
    case SET_END_DATE_AND_TIME:
      return {
        ...state,
        settings: {
          ...state.settings,
          endDate: action.payload
        }
      }
    case SET_TIME_RANGE_FILTER:
      return {
        ...state,
        settings: {
          ...state.settings,
          timeRanges: state.settings.timeRanges.map((r, i) => {
            if (i !== action.payload.index) {
              return r
            }
            return {
              ...r,
              model: {
                ...r.model,
                ...action.payload.value
              }
            }
          })
        }
      }
    case TOGGLE_TIME_RANGE_FILTER_ACTIVE:
      return {
        ...state,
        settings: {
          ...state.settings,
          timeRanges: state.settings.timeRanges.map((r, i) => {
            if (i !== action.payload.index) {
              return r
            }
            return {
              ...r,
              model: {
                ...r.model,
                active: !r.model.active
              }
            }
          })
        }
      }

    default:
      return state
  }
}
