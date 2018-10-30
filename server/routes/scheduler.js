const { Router } = require('express')
const router = Router()
const DbConnection = require('../database/connection')
const crawlerService = require('../services/crawler.service')
const schedulerService = require('../services/scheduler')

DbConnection.connect()
crawlerService.initCrawler();

router.post('/scheduler', function (req, res, next) {
  const data = req.body;

  schedulerService.runEveryMinute(data.urls);
  res.send("Crawler is running");
})

router.get('/testing', function (req, res, next) {
  res.json("it's working")
})


module.exports = router