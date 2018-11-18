export const getDayOfTheWeek = date => {
  switch (date.getDay()) {
    case 1:
      return 'måndag'
    case 2:
      return 'tisdag'
    case 3:
      return 'onsdag'
    case 4:
      return 'torsdag'
    case 5:
      return 'fredag'
    case 6:
      return 'lördag'
    case 0:
      return 'söndag'
    default:
      return ''
  }
}

export const datesMatch = (date1, date2) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getFullYear() === date2.getFullYear() &&
    date1.getDate() === date2.getDate()
  )
}

export const getDateDiff = (first, second) =>
  Math.round((second - first) / (1000 * 60 * 60 * 24))

export const prettyDate = inputDate => {
  const now = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(now.getDate() + 1)
  let result = ''

  if (datesMatch(now, inputDate)) {
    result = 'idag'
  } else if (datesMatch(tomorrow, inputDate)) {
    result = 'imorgon'
  } else {
    result = `${getDayOfTheWeek(inputDate)}`
  }

  if (getDateDiff(now, inputDate) > 7) {
    result += ` ${inputDate.getDate()}`
  }

  return result
}
