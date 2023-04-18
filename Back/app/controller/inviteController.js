const { inviteModel } = require('../model');
const coreController = require('./coreController');

const inviteController = {

    basicQuery : coreController.createBaseQuery(inviteModel, "invite")
}

module.exports = inviteController;