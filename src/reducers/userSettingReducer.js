import {
  ADD_FAVOURITE_CLUB,
  REMOVE_FAVOURITE_CLUB,
  RECEIVE_SETTINGS,
  REMOVE_LOCATION,
  ADD_LOCATION,
  SET_LOCATIONS,
  LOADING_INITIAL_DATA_CHANGED,
  TOGGLE_TIME_RANGE_ACTIVE,
  SET_TIME_RANGE,
  TOGGLE_CLUB_EXPAND
} from '../actions/types'
import { defaultSlotSettings } from '../slotDefaults'

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
        clubs:
          state.clubs.find(c => c.clubId === action.payload.clubId) ===
          undefined
            ? [...state.clubs, { ...action.payload, days: defaultSlotSettings }]
            : state.clubs.filter(f => {
                if (f.clubId === action.payload.clubId) {
                  f.inactivated = false
                }
                return f
              })
      }
    case REMOVE_FAVOURITE_CLUB:
      return {
        ...state,
        clubs: state.clubs.filter(f => {
          if (f.clubId === action.payload.clubId) {
            f.inactivated = true
          }
          return f
        })
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
    case TOGGLE_CLUB_EXPAND:
      return {
        ...state,
        clubs: state.clubs.map(c => ({
          ...c,
          expanded:
            c.clubId === action.payload.clubId ? !c.expanded : c.expanded
        }))
      }
    case TOGGLE_TIME_RANGE_ACTIVE:
      return {
        ...state,
        clubs: state.clubs.map(c => {
          if (c.clubId !== action.payload.clubId) return c

          c.days = c.days.map((d, dayIndex) => {
            switch (action.payload.timeRangeIndex) {
              case 0: //Mornar
                if (dayIndex !== 0 && dayIndex !== 6) {
                  d = d.map((r, i) => ({
                    ...r,
                    active: i === 0 ? !r.active : r.active
                  }))
                }
                break
              case 1: //Luncher
                if (dayIndex !== 0 && dayIndex !== 6) {
                  d = d.map((r, i) => ({
                    ...r,
                    active: i === 1 ? !r.active : r.active
                  }))
                }
                break
              case 2: //Kvällar
                if (dayIndex !== 0 && dayIndex !== 6) {
                  d = d.map((r, i) => ({
                    ...r,
                    active: i === 2 ? !r.active : r.active
                  }))
                }
                break
              case 3: //Helger
                if (dayIndex === 0 || dayIndex === 6) {
                  d = d.map((r, i) => ({
                    ...r,
                    active: i === 0 ? !r.active : r.active
                  }))
                }
                break

              default:
                break
            }
            return d
          })
          return c
        })
      }
    case SET_TIME_RANGE:
      return {
        ...state,
        clubs: state.clubs.map(c => {
          if (c.clubId !== action.payload.clubId) return c

          c.days = c.days.map((d, dayIndex) => {
            switch (action.payload.timeRangeIndex) {
              case 0: //Mornar
                if (dayIndex !== 0 && dayIndex !== 6) {
                  d = d.map((r, i) => {
                    if (i === 0) {
                      r = { ...r, ...action.payload.value }
                    }
                    return r
                  })
                }
                break
              case 1: //Luncher
                if (dayIndex !== 0 && dayIndex !== 6) {
                  d = d.map((r, i) => {
                    if (i === 1) {
                      r = { ...r, ...action.payload.value }
                    }
                    return r
                  })
                }
                break
              case 2: //Kvällar
                if (dayIndex !== 0 && dayIndex !== 6) {
                  d = d.map((r, i) => {
                    if (i === 2) {
                      r = { ...r, ...action.payload.value }
                    }
                    return r
                  })
                }
                break
              case 3: //Helger
                if (dayIndex === 0 || dayIndex === 6) {
                  d = d.map((r, i) => {
                    if (i === 0) {
                      r = { ...r, ...action.payload.value }
                    }
                    return r
                  })
                }
                break

              default:
                break
            }
            return d
          })
          return c
        })
      }
    default:
      return state
  }
}
