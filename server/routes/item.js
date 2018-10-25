const { Router } = require('express')
const router = Router()
const DbConnection = require('../database/connection')

DbConnection.connect()
const items = [
    { name: 'Alexandre' },
    { name: 'Pooya' },
    { name: 'Sébastien' }
  ]

router.get('/items', function (req, res, next) {
  res.json(items)
})

router.post('/item', function (req, res, next) {
  const item = req.body.data;
  DbConnection.findOneAndUpdate(item);
  res.json(item);
})

module.exports = router