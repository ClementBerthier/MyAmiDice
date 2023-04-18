const apiError = require('./apiError');

const errorHandler = {

    
    manage(err, _, res, __) {

        console.log(err.message)
        res.status(err.code).json({"err" : err.message });
    },

    _204 (_, __, next) {
        
        const error = new apiError("Désolé, le contenu n'existe pas", 204);
        next(error);
    },

    _400 (_, __, next) {

        const error = new apiError("Désolé, la requête est mal formulé", 400);
        next(error);
    },

    _401(_, __, next) {

        const error = new apiError("Désolé, vous n'êtes pas authentifié", 401);
        next(error);
    },

    _403(_, __, next) {
        const error = new apiError("Désolé, vous n'avez pas les droits requis", 403);
        next(error);
    },

    _404() {
        throw new apiError("Désolé, page non trouvé", 404);
    },

    _500 (_, __, next) {
        const error = new apiError("Désolé, le système à connu un échec critique", 500);
        next(error);
    },

}

module.exports = errorHandler;