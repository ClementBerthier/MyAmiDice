const errorHandler = require('../../service/errorService/errorHandler');
const { mapModel} = require('../model');
const coreController = require('./coreController');

const mapController = {

    basicQuery : coreController.createBaseQuery(mapModel, "maps"),

    async mapCreate ( req, res, next) {

        try {            
            let map;
            
            if (req.file) {         //si j'ai un fichier alors je recup le req.body[0]
                map = req.body; //je le nomme character
                map.url = req.file.path;  //je donne a la clef avatar le chemin du fichier enregister
            } else {    //si pas de fichier je ne fais rien et te laisse executer ton code
                console.error("Aucun fichier n'a été trouvé dans la requête");
                map = req.body
            }
            
            const createMap = await mapModel.createOrUpdate("maps", map);
            
            res.json(createMap);
        
        } catch(e) {
            next(e);
        }
    }
}

module.exports = mapController;