const Crawler = require("simplecrawler");
const cheerio = require("cheerio");
const DbConnection = require('../database/connection')


module.exports = {
  crawler : {},
  initCrawler() {
    this.crawler = new Crawler("https://www.amazon.com/dp/B00N0IHMXM");
    this.crawler.interval = 1000;
    this.crawler.maxConcurrency = 1;
    this.crawler.maxDepth = 1;

    this.crawler.on("crawlstart", () => {
      console.log(this.crawler.queue)
      console.log("Crawl starting");
    });
    
    this.crawler.on("fetchstart", queueItem => {
      // console.log("fetchStart", queueItem);
    });
    
    this.crawler.on("fetchcomplete", (queueItem, responseBuffer, response) => {
      console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
      var $ = cheerio.load(responseBuffer);

      var item = {};

      var asin = $("#ASIN").val();
      var productTitle = $("#productTitle").text().trim();
      var price = $("#priceblock_ourprice").text().trim();
      var totalReview = $("#acrCustomerReviewText").text().trim();
      var totalQuestion = $("#askATFLink .a-size-base").text().trim();
      var dateFirstAvailable = $("#productDetails_detailBullets_sections1 th:contains(Date First Available)").next().text().trim();
      var fiveStar = Number($("#histogramTable > tbody > tr:nth-child(1) > td.a-text-right.aok-nowrap > a").text().trim().replace("%",""));
      var fourStar = Number($("#histogramTable > tbody > tr:nth-child(2) > td.a-text-right.aok-nowrap > a").text().trim().replace("%",""));
      var threeStar = Number($("#histogramTable > tbody > tr:nth-child(3) > td.a-text-right.aok-nowrap > a").text().trim().replace("%",""));
      var twoStar = Number($("#histogramTable > tbody > tr:nth-child(4) > td.a-text-right.aok-nowrap > a").text().trim().replace("%",""));
      var oneStar = Number($("#histogramTable > tbody > tr:nth-child(5) > td.a-text-right.aok-nowrap > a").text().trim().replace("%",""));

      var totalReviewInNumber = Number(totalReview.replace(/,/g, '.').split(" ")[0]);
      var totalQuestionInNumber = Number(totalQuestion.split(" ")[0]);

      item.asin = asin;
      item.productTitle = productTitle;
      item.price = price;
      item.totalReview = totalReviewInNumber;
      item.totalQuestion = totalQuestionInNumber;
      item.dateFirstAvailable = dateFirstAvailable;
      item.fiveStar = Math.ceil(fiveStar*totalReviewInNumber/100);
      item.fourStar = Math.ceil(fourStar*totalReviewInNumber/100);
      item.threeStar = Math.ceil(threeStar*totalReviewInNumber/100);
      item.twoStar = Math.ceil(twoStar*totalReviewInNumber/100);
      item.oneStar = Math.ceil(oneStar*totalReviewInNumber/100);
      item.dayOfYear = this.daysIntoYear(dateFirstAvailable)

      console.log(item);

      DbConnection.findOneAndUpdate(item);
    });
    
    this.crawler.on("complete", () => {
      this.crawler.queue = new Crawler.queue()
      console.log("Finished!");
    });
  },
  queue(urls) {
    urls = urls.split(",");
    if (urls.length > 0) {
      urls.forEach((url) => {
        this.crawler.queueURL(url.trim(), undefined, true);
      });
    }
  },
  start() {
    this.crawler.start();
  },
  daysIntoYear(date){
    date = new Date(date);
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
  }
}