const _ = require('lodash')
const callService = require('./callService')

callService.create({
  date: _.now(),
  req: {
    headers: [
      {
        key: "Accept",
        value: "application/json"
      },
      {
        key: "Content-type",
        value: "application/json"
      }
    ],
    method: "PUT",
    queries: [
      {
        key: "a",
        value: "1"
      },
      {
        key: "b",
        value: "A"
      },
      {
        key: "c",
        value: "1 A+"
      }
    ],
    text: "{\"a\": 1}",
    url: "http://jsonplaceholder.typicode.com/posts/1"
  }
})
