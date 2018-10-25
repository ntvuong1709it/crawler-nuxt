const { Router } = require('express')
const router = Router()
const DbConnection = require('../database/connection')
const crawlerService = require('../services/crawler.service')
const schedulerService = require('../services/scheduler')

DbConnection.connect()
crawlerService.initCrawler();

const items = [
    { name: 'Alexandre' },
    { name: 'Pooya' },
    { name: 'Sébastien' }
  ]

router.post('/scheduler', function (req, res, next) {
  const data = req.body;

  schedulerService.runEveryMinute(data.urls);
  res.send("Crawler is running");
})

module.exports = router