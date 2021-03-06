export const DefaultWeekendSlot = {
  startTime: 11,
  endTime: 18,
  active: true
}

export const DefaultMorningSlot = {
  startTime: 7,
  endTime: 9,
  active: false
}

export const DefaultLunchSlot = {
  startTime: 11,
  endTime: 13,
  active: false
}

export const DefaultNightSlot = {
  startTime: 17,
  endTime: 20,
  active: true
}

export const defaultSlotSettings = [
  [DefaultWeekendSlot],
  [DefaultMorningSlot, DefaultLunchSlot, DefaultNightSlot],
  [DefaultMorningSlot, DefaultLunchSlot, DefaultNightSlot],
  [DefaultMorningSlot, DefaultLunchSlot, DefaultNightSlot],
  [DefaultMorningSlot, DefaultLunchSlot, DefaultNightSlot],
  [DefaultMorningSlot, DefaultLunchSlot, DefaultNightSlot],
  [DefaultWeekendSlot]
]

export const MorningPickerSettings = {
  min: 6,
  max: 10,
  step: 0.5,
  label: 'Mornar'
}

export const LunchPickerSettings = {
  min: 10,
  max: 15,
  step: 0.5,
  label: 'Luncher'
}

export const NightPickerSettings = {
  min: 15,
  max: 23,
  step: 0.5,
  label: 'Kvällar'
}

export const WeekendPickerSettings = {
  min: 6,
  max: 23,
  step: 0.5,
  label: 'Helger'
}

export const PickerRange = [
  MorningPickerSettings,
  LunchPickerSettings,
  NightPickerSettings,
  WeekendPickerSettings
]

export const DefaultTimeRangePickers = [
  { model: { ...DefaultMorningSlot, active: true }, ...MorningPickerSettings },
  {
    model: { ...DefaultLunchSlot, active: true },
    ...LunchPickerSettings,
    active: true
  },
  {
    model: { ...DefaultNightSlot, active: true },
    ...NightPickerSettings,
    active: true
  },
  {
    model: { ...DefaultWeekendSlot, active: true },
    ...WeekendPickerSettings,
    active: true
  }
]

export const createPickerModelFromPreference = (
  dayPreference = defaultSlotSettings
) => {
  return PickerRange.map((p, i) => {
    let model
    switch (p.label) {
      case 'Mornar':
        model = { ...dayPreference[1][0], expanded: false }
        break
      case 'Luncher':
        model = { ...dayPreference[1][1], expanded: false }
        break
      case 'Kvällar':
        model = { ...dayPreference[1][2], expanded: false }
        break
      case 'Helger':
        model = { ...dayPreference[0][0], expanded: false }
        break
      default:
        break
    }
    return { ...p, model }
  })
}
