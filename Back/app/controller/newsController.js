const { newsModel} = require('../model');
const coreController = require('./coreController');

const newsController = {

    basicQuery : coreController.createBaseQuery( newsModel, "news")
}

module.exports = newsController;