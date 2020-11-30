// setup
const admin = require("firebase-admin")
const serviceAccount = require("./credentials/serviceAccount.json")
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
})
const firestore = admin.firestore()
firestore.settings({timestampsInSnapshots: true})

// functions
// ダミーのCPU温度取得処理
const fetchTemperature = function() {
  const array = [41.0, 41.5, 42.0]
  return array[Math.floor(Math.random() * array.length)]
}
// CPU温度送信処理
const sendTemperature = function() {
  const value = fetchTemperature()
  const sentAt = new Date()
  console.log(`${sentAt}: ${value}`)
  firestore.collection('rasp_temperatures')
  .add({
    value: value,
    sentAt: sentAt
  })
}

// main
sendTemperature()
setInterval(function() {
  sendTemperature()
}, 60000)