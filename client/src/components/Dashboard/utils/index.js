const toRad = num => {
  return (num * Math.PI) / 180
}

export const calcDistance = (myLat, myLng, custLat, custLng) => {
  let R = 6371
  let dLat = toRad(myLat - custLat)
  let dLng = toRad(myLng - custLng)

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(myLat)) *
      Math.cos(toRad(custLat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  let c = 2 * Math.atan(Math.sqrt(a), Math.sqrt(1 - a))
  let d = R * c
  return d.toFixed(2)
}
