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
  const clubsWithSelected = clubsByLocation.map(c => ({
    ...c,
    selected: target.clubs.some(x => x.clubId === c.id && !x.inactivated)
  }))
  return _.orderBy(
    clubsWithSelected,
    [c => c.selected, c => c.name],
    ['desc', 'asc']
  )
}

export const getSelectedSports = state => {
  const { slot } = state
  return slot.availableSports.sort().map(s => ({
    name: s,
    selected: slot.settings.sports.includes(s)
  }))
}

export const getFavouriteClubsWithTimeRanges = state => {
  const { club, settings } = state
  if (!club || club.clubs.length === 0) return []
  const data = settings.clubs
    .filter(c => c.clubId !== -1 && !c.inactivated)
    .map(c => ({
      ...c,
      ...club.clubs.find(club => club.id === c.clubId),
      pickerRange: createPickerModelFromPreference(c.days)
    }))

  return _.orderBy(data, c => c.name, 'asc')
}

export const getClubTimeRanges = (settings, clubId) => {
  const club = settings.clubs.find(c => c.clubId === clubId)
  return createPickerModelFromPreference(club.days)
}

function slotHasSelectedLocation(slot, clubs, locations) {
  return locations.includes(clubs.find(c => c.id === slot.clubId).location)
}

const inRange = (slot, rangeModel) =>
  rangeModel.startTime <= slot.startTime &&
  rangeModel.endTime > slot.startTime &&
  rangeModel.active

const startTimeIsWithinRanges = (slot, [morning, lunch, night, weekend]) => {
  const day = new Date(slot.date).getDay()
  if (day === 0 || day === 6) {
    return inRange(slot, weekend.model)
  } else {
    return [morning, lunch, night].some(r => inRange(slot, r.model))
  }
}

export const filteredSlots = state => {
  const { slot, club } = state
  const filteredClubsids = slot.settings.clubs
    .filter(c => c.clubId !== -1 && !c.inactivated)
    .map(c => c.clubId)
  const slots = slot.slots.filter(
    s =>
      slot.settings.sports.includes(s.sport.toLowerCase()) &&
      filteredClubsids.includes(s.clubId) &&
      slotHasSelectedLocation(s, club.clubs, slot.settings.locations) &&
      s.date.getTime() >= slot.settings.startDate.getTime() &&
      s.date.getTime() <= slot.settings.endDate.getTime() &&
      startTimeIsWithinRanges(s, slot.settings.timeRanges)
  )
  return _.orderBy(slots, s => new Date(s.date).getTime(), 'asc')
}
