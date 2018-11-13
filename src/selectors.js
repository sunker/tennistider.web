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
    selected: target.clubs.find(x => x.clubId === c.id) != null
  }))
}

export const filteredSlots = state => {
  const { slot, clubs } = state
  const filteredClubsids = slot.settings.clubs.map(c => c.clubId)
  return slot.slots.filter(s => filteredClubsids.includes(s.clubId))
}
