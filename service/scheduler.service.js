// import { Scheduler_Config } from '../config/config'
// import * as Agenda from 'agenda';
// import CrawlerService from '../service/crawler.service'

// class Scheduler {
//     constructor () {
//         const mongoConnectionString = Scheduler_Config.DB_URL;
//         this.agenda = new Agenda({db: {address: mongoConnectionString,collection: 'agendaCollection', options: { useNewUrlParser: true } }});
//     }
//     // runEveryMinute(urls) {
//     //     this.startCrawl(urls);
//     //     var THIS = this;
//     //     (async function() { // IIFE to give access to async/await
//     //         await THIS.agenda.start();
//     //         console.log('crawl');
//     //         await THIS.agenda.every('30 seconds', 'crawl')
//     //       })();
        
//     // }
//     // startCrawl(urls) {
//     //     this.agenda.define('crawl', job => {
//     //         var crawlerService = new CrawlerService();
//     //         crawlerService.startCrawl(urls);
//     //     });
//     // }
// }
// export default Scheduler;