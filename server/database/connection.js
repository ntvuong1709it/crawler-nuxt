const mongoose = require('mongoose');
const Item = require('../model/item')
const DB = require('../config/db-connection')

const DbConnection = {
    url : DB.DB_URL,

    connect: function() {
        mongoose.connection.on('open', () => {
            mongoose.connection.db.collection('agendaDb', (err, collection) => {
              collection.updateMany({ lockedAt: { $exists: true }, lastFinishedAt: { $exists: false } }, {
                $unset: {
                  lockedAt: undefined,
                  lastModifiedBy: undefined,
                  lastRunAt: undefined
                },
                $set: { nextRunAt: new Date() }
              }, { multi: true }, (e, numUnlocked) => {
                if (e) { console.error(e); }
                console.log(`Unlocked #{${numUnlocked}} jobs.`);
              });
            });
          });

        mongoose.connect(this.url, { 
            useNewUrlParser: true,
            socketTimeoutMS: 0,
            keepAlive: true,
            reconnectTries: 10,
            useNewUrlParser: true
         });
        mongoose.set('useFindAndModify', false);
    },
    save: function(item) {
        var itemModel = new Item();

        itemModel.asin = item.asin;
        itemModel.productTitle = item.productTitle;
        itemModel.price = item.price;
        itemModel.totalReview = item.totalReview;
        itemModel.totalQuestion = item.totalQuestion;
        itemModel.dateFirstAvailable = item.dateFirstAvailable;
        itemModel.fiveStar = item.fiveStar;
        itemModel.fourStar = item.fourStar;
        itemModel.threeStar = item.threeStar;
        itemModel.twoStar = item.twoStar;
        itemModel.oneStar = item.oneStar;
        itemModel.dayOfYear = item.dayOfYear;

        itemModel.createdTimeOnUtc = item.createdTimeOnUtc;
        itemModel.modifiedTimeOnUtc = item.modifiedTimeOnUtc;

        console.log(itemModel);

        itemModel.save();
    },
    findOneAndUpdate: function(item) {
        var query = { asin : item.asin };

        item.modifiedTimeOnUtc = new Date().toUTCString()

        Item.findOneAndUpdate(query, item, (err, doc) => {
            if(err) {
                this.handleFailure(err);
                return;
            }
                
            if(!doc) {
                console.log('Item does not existed. Create new record')
                item.createdTimeOnUtc = new Date().toUTCString()
                this.save(item);
            }

            return doc;
        });
    },
    handleFailure: function(err) {
        // TODO: Write logs
        console.log(err);
    }
}

module.exports = DbConnection;