const superagent = require('superagent')

function callApi (req) {
  console.log('>>> imcoming request:', req)
  return superagent(req.method, req.url)
    .query(req.queries)
    .set(req.headers)
    .send(req.body)
    .ok(res => res.status)
    .then(res => {
      return {
        statusCode: res.res.statusCode,
        statusMessage: res.res.statusMessage,
        headers: res.headers,
        body: res.body,
        text: res.text
      }
    })
    .then(res => {
      console.log('<<< outgoing response:', res)
      return res
    })
}

module.exports = callApi
