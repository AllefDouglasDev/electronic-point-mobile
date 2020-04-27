function addZeroIfNeeded(value) {
  return value > 9 ? value : `0${value}`
}

export function getFormattedDate(date) {
  try {
    let array = date.split('-')
    const day = addZeroIfNeeded(array[2])
    const month = addZeroIfNeeded(array[1])
    const year = addZeroIfNeeded(array[0])
    return `${day}/${month}/${year}`
  } catch (err) {
    return date
  }
}
