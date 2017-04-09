import Firebase from 'firebase'

export default Firebase.initializeApp({
  databaseURL: 'https://api-client-61686.firebaseio.com'
}).database()
