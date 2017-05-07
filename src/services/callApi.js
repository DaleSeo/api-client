import superagent from 'superagent'

export default function callApi (req) {
  let queries = arrayToObj(req.queries)
  let headers = arrayToObj(req.headers)
  console.log('queries:', queries)
  console.log('headers:', headers)
  return superagent.post('https://call-api.herokuapp.com')
    .send(req)
    .query(queries)
    .set(headers)
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
      console.log('error.response:', error.response)
      if (error.response.body.error) {
        return {error: error.response.body.error}
      } else {
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
