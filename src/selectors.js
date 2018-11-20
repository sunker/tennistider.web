import _ from 'lodash'
import { createPickerModelFromPreference } from './slotDefaults'

export const getLocationsWithUserData = (state, filterSettings = false) => {
  const { club, settings, slot } = state
  const target = filterSettings ? slot.settings : settings
  const locations = _.uniq(club.clubs.map(c => c.location))
  return locations.map(l => ({
    name: l,
    selected: target.locations.includes(l)
  }))
}

export const getClubsByLocationWithUserData = (
  state,
  filterSettings = false
) => {
  const { club, settings, slot } = state
  const target = filterSettings ? slot.settings : settings
  const clubsByLocation = club.clubs.filter(c =>
    target.locations.includes(c.location)
  )

  return _.orderBy(
    clubsByLocation.map(c => ({
      ...c,
      selected: target.clubs.some(x => x.clubId === c.id && !x.inactivated)
    })),
    c => c.selected,
    'desc'
  )
}

export const getFavouriteClubsWithTimeRanges = state => {
  const { club, settings } = state
  if (!club || club.clubs.length === 0) return []
  return settings.clubs
    .filter(c => c.clubId !== -1 && !c.inactivated)
    .map(c => ({
      ...c,
      ...club.clubs.find(club => club.id === c.clubId),
      pickerRange: createPickerModelFromPreference(c.days)
    }))
}

export const getClubTimeRanges = (state, clubId) => {
  const club = state.settings.clubs.find(c => c.clubId === clubId)
  return createPickerModelFromPreference(club.days)
}

function slotHasSelectedLocation(slot, clubs, locations) {
  return locations.includes(clubs.find(c => c.id === slot.clubId).location)
}

export const filteredSlots = state => {
  const { slot, club } = state
  const filteredClubsids = slot.settings.clubs.map(c => c.clubId)
  // console.log(slot.slots)
  return slot.slots.filter(
    s =>
      filteredClubsids.includes(s.clubId) &&
      slotHasSelectedLocation(s, club.clubs, slot.settings.locations) &&
      s.date.getTime() >= slot.settings.startDate.getTime() &&
      s.date.getTime() <= slot.settings.endDate.getTime()
  )
}
