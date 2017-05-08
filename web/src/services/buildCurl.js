import querystring from 'querystring'
import _ from 'lodash'
import utils from './utils'

export default function buildCurl (req) {
  let url = req.url

  let queryString = buildQueryString(req.queries)
  if (queryString) {
    url += '?' + queryString
  }

  let curl = `curl -X ${req.method} '${url}'`

  let headerString = buildHeaderString(req.headers)
  if (headerString) {
    curl += headerString
  }

  if (req.text) {
    curl += ` -d '${req.text}'`
  }
  return curl
}

function buildQueryString (queries) {
  if (!queries) {
    return null
  }
  let queryObject = utils.arrayToObj(queries)
  return querystring.stringify(queryObject)
}

function buildHeaderString (headers) {
  if (!headers) {
    return null
  }
  let headerObject = utils.arrayToObj(headers)

  let headerString = ''
  _.entries(headerObject).forEach(([key, value]) => {
    headerString += ` -H '${key}: ${value}' `
  })
  return headerString
}
