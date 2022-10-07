const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const routes = require('./routes')


// LEAVE FOR DISCUSSION
// const fs = require('fs')
// const readline = require('readline')

app.use(cors({
  origin: 'http://localhost:8080'
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('App is working'))

app.use('/api', routes)

// Starts the HTTP server
app.listen(3000, () => {})

module.exports = {
  app
}