import uniq from 'lodash.uniq'

export const getLocationsWithUserData = (state, filterSettings = false) => {
  const { club, settings, slot } = state
  const target = filterSettings ? slot.settings : settings
  const locations = uniq(club.clubs.map(c => c.location))
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

  return clubsByLocation.map(c => ({
    ...c,
    selected:
      target.clubs.find(x => x.clubId === c.id && !x.inactivated) != null
  }))
}

function slotHasSelectedLocation(slot, clubs, locations) {
  return locations.includes(clubs.find(c => c.id === slot.clubId).location)
}

export const filteredSlots = state => {
  const { slot, club } = state
  const filteredClubsids = slot.settings.clubs.map(c => c.clubId)
  console.log(slot.slots)
  return slot.slots.filter(
    s =>
      filteredClubsids.includes(s.clubId) &&
      slotHasSelectedLocation(s, club.clubs, slot.settings.locations) &&
      s.date.getTime() >= slot.settings.startDate.getTime() &&
      s.date.getTime() <= slot.settings.endDate.getTime()
  )
}
