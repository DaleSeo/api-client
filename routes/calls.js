const router = require('express').Router()
const callService = require('../services/callService')

router.get('/', (req, res) => {
  callService.find()
    .then(calls => res.send(calls))
})

router.post('/', (req, res) => {
  callService.create(req.body)
    .then(id => res.status(201).send({id: id}))
})

router.delete('/:id', (req, res) => {
  callService.remove(req.params.id)
    .then(_ => res.send({}))
})

module.exports = router
