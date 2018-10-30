const express = require('express')
const bodyParser = require('body-parser')

// Create express instnace
const app = express()


app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

// Require API routes
const items = require('./routes/item')
const scheduler = require('./routes/scheduler')


// Import API Routes
app.use(items)
app.use(scheduler)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
