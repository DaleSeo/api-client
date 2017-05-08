exports.arrayToObj = function (array) {
  return array.reduce((prev, curr) => {
    prev[curr.key] = curr.value
    return prev
  }, {})
}
