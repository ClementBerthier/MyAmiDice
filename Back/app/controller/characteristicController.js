const { characteristicModel } = require('../model');
const coreController = require('./coreController');

const characteristicController = {

    basicQuery : coreController.createBaseQuery(characteristicModel, "characteristics"),

}

module.exports = characteristicController;