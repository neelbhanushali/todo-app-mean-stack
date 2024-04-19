require('dotenv').config()
const port = process.env.PORT
const app = require('./app')

// mongoose
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI, {
  serverSelectionTimeoutMS: 5000
}).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
.catch((err) => {
  console.log('db connection error', err)
})

const conn = mongoose.connection
conn.on('connected', () => console.log('db connected'));
conn.on('open', () => console.log('connection open'));
conn.on('disconnected', () => console.log('db disconnected'));
conn.on('reconnected', () => console.log('db reconnected'));
conn.on('disconnecting', () => console.log('db disconnecting'));
conn.on('close', () => console.log('connection close'));
