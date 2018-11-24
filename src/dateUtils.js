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
  const currentWeek = getWeekNumber(now)
  const dateWeek = getWeekNumber(inputDate)
  let result = ''

  if (datesMatch(now, inputDate)) {
    result = 'idag'
  } else if (datesMatch(tomorrow, inputDate)) {
    result = 'imorgon'
  } else {
    result = `${getDayOfTheWeek(inputDate)}`
  }

  if (getDateDiff(now, inputDate) > 7 && currentWeek !== dateWeek) {
    result += ` ${inputDate.getDate()}/${inputDate.getMonth()}`
  }

  return result
}

export const getWeekNumber = date => {
  var date = new Date(date.getTime())
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7))
  var week1 = new Date(date.getFullYear(), 0, 4)
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  )
}

// Returns the four-digit year corresponding to the ISO week of the date.
export const getWeekYear = date => {
  var date = new Date(date.getTime())
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7))
  return date.getFullYear()
}
