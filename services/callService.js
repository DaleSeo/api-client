const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

const config = require('../config')

const mongodbUri = config.MONGODB_URI

exports.find = function () {
  return getCollection()
    .then(col => col.find().sort({_id: -1}).toArray())
}

exports.create = function (call) {
  return getCollection()
    .then(col => col.insertOne(call))
    .then(res => res.ops[0]._id)
}

exports.remove = function (id) {
  return getCollection()
    .then(col => col.deleteOne({_id: new ObjectID(id)}))
}

function getCollection () {
  return MongoClient.connect(mongodbUri)
    .then(db => db.collection('calls'))
}
