const { gameModel } = require('../model/');
const coreController = require('./coreController');
const errorHandler = require('../../service/errorService/errorHandler')

const gameController = {

    basicQuery : coreController.createBaseQuery( gameModel, "games"),

    async getGameByIdWithAll( req, res, next) {

        try {
            
            const result = await gameModel.getGameByIdWithAll(req.params.id, req.params.userid);
   
            res.json(result);
                
        } catch(e) {
            next(e);
        }

    }
}

module.exports = gameController;