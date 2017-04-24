import superagent from 'superagent'

export default class ApiCaller {

  call (req, callback) {
    return superagent.post('https://call-api.herokuapp.com')
      .send(req)
      .end((err, res) => {
        if (err) return callback(err)
        console.log('res:', res)
        let response = {
          statusCode: res.body.statusCode,
          statusMessage: res.body.statusMessage,
          headers: res.body.headers,
          body: res.body.body,
          text: res.body.text
        }
        callback(null, response)
      })
  }

}
