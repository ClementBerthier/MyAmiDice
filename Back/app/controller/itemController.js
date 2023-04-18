const { itemModel} = require('../model');
const coreController = require('./coreController');

const itemController = {

    basicQuery : coreController.createBaseQuery(itemModel, "items")
}

module.exports = itemController;