const { skillModel} = require('../model');
const coreController = require('./coreController');

const skillController = {

    basicQuery : coreController.createBaseQuery( skillModel, "skills")
}

module.exports = skillController;