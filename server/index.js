const express = require('express')
const bodyParser = require('body-parser')

// Create express instnace
const app = express()


app.use(bodyParser.json({limit: '50mb'})) // support json encoded bodies
app.use(bodyParser.urlencoded({limit: '50mb', extended: true })) // support encoded bodies

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
