const config = require('../config/db-connection')
const Agenda = require("agenda");
const crawlerService = require('./crawler.service')

const Scheduler  = {
    agenda : new Agenda({db: {address: config.DB_URL, collection: 'agendaCollection', options: { useNewUrlParser: true } }}),
    runEveryMinute(urls) {
        this.defineCrawlingJob(urls);
        (async () => { // IIFE to give access to async/await
            await this.agenda.start();
            console.log('Start scheduler to crawl');
            console.log(urls)
            await this.agenda.every('30 seconds', 'crawl', urls)
          })();
        
    },
    defineCrawlingJob(urls) {
        this.agenda.define('crawl', job => {
            crawlerService.queue(urls);
            crawlerService.start();
        });
    }
}
module.exports = Scheduler;