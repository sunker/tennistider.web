import uniq from 'lodash.uniq'

export const getLocationsWithUserData = state => {
  const { club, settings } = state
  const locations = uniq(club.clubs.map(c => c.location))
  return locations.map(l => ({
    name: l,
    selected: settings.locations.includes(l)
  }))
}

export const getClubsByLocationWithUserData = state => {
  const { club, settings } = state
  const clubsByLocation = club.clubs.filter(c =>
    settings.locations.includes(c.location)
  )

  return clubsByLocation.map(c => ({
    ...c,
    selected: settings.clubs.find(x => x.clubId === c.id) != null
  }))
}
