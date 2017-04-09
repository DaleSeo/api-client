import superagent from 'superagent'

export default class ApiCaller {

  call (req, callback) {
    return superagent(req.method, req.url)
      .send(req.body)
      .end((err, res) => {
        if (err) return callback(err)
        let response = {
          statusCode: res.statusCode,
          statusText: res.statusText,
          headers: res.header,
          body: res.body,
          text: res.text
        }
        callback(null, response)
      })
  }

}
