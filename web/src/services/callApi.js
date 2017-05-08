import superagent from 'superagent'

export default function callApi (request) {
  let req = Object.assign({}, request)
  console.log('req:', req)
  return new Promise((resolve, reject) => {
    if (req.text.trim()) {
      req.body = JSON.parse(req.text)
    }
    resolve(req)
  })
  .catch(error => {
    console.log('error:', error)
    throw error
  })
  .then(req => {
    req.queries = arrayToObj(req.queries)
    req.headers = arrayToObj(req.headers)
    return req
  })
  .then(req => superagent.post('/').send(req))
  .then(response => {
    console.log('response.body:', response.body)
    return response.body
  })
  .then(response => {
    return {
      statusCode: response.statusCode,
      statusMessage: response.statusMessage,
      headers: response.headers,
      body: response.body,
      text: response.text
    }
  })
  .catch(error => {
    if (error.response && error.response.body.error) {
      console.log('error.response.body.error:', error.response.body.error)
      throw new Error(error.response.body.error.code)
    } else {
      console.log('error:', error)
      throw error
    }
  })
}

function arrayToObj (array) {
  return array.reduce((prev, curr) => {
    prev[curr.key] = curr.value
    return prev
  }, {})
}
