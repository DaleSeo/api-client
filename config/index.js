require('dotenv').config()

console.log('MONGODB_URI:', process.env.MONGODB_URI)

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/checkapis'
}
