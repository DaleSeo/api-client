var express = require('express');
var router = express.Router();

const path = require('path')
const callApi = require('../services/callApi')

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'api.html'))
})

router.post('/', function(req, res, next) {
  console.log(req.body)
  callApi(req.body)
    .then(result => res.send(result))
    .catch(error => {
      console.log('error:', error)
      res.status(500).send({error: error})
    })
})

module.exports = router;
