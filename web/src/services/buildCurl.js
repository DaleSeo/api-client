import querystring from 'querystring'

export default function buildCurl (req) {
  let url = req.url
  let queryString = buildQueryString(req.queries)
  if (queryString) {
    url += '?' + queryString
  }

  let curl = `curl '${url}' -X ${req.method}`

  if (req.text) {
    curl += ` -d '${req.text}'`
  }
  return curl
}

function buildQueryString (queries) {
  if (!queries) {
    return null
  }
  let queryObject = queries.reduce((prev, curr) => {
    prev[curr.key] = curr.value
    return prev
  }, {})
  return querystring.stringify(queryObject)
}
