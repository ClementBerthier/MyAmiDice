const { characterModel, characteristicModel } = require('../model');
const coreController = require('./coreController');
const jwt = require('jsonwebtoken');
// const errorHandler = require('../../service/errorService/errorHandler');

const characterController = {

    basicQuery : coreController.createBaseQuery(characterModel, "characters"),
    
    async getCharacterByIdWithAll( req, res, next) {

        try {
        
            const result = await characterModel.getCharacterByIdWithAll(req.params.id);
                    
            res.json(result);  

        }catch(e) {
            next(e);
        }        
    },

    async createCharacterWithCaracteristics ( req, res, next) {

        try {
     
            const fullCharacters = [];
            
            let character;
    
            if (req.file) {         //si j'ai un fichier alors je recup le req.body[0]
                character = req.body[0]; //je le nomme character
                character.avatar = req.file.path;  //je donne a la clef avatar le chemin du fichier enregister
            } else {    //si pas de fichier je ne fais rien et te laisse executer ton code
                console.error("Aucun fichier n'a été trouvé dans la requête");
                character = req.body[0]
            }
            
            const createCharacter = await characterModel.createOrUpdate("characters", character); //et ici character a la place du req.body[0]

            const characteristics = req.body[1];
            
            characteristics.characters_id = createCharacter.id;
            
            const createCharacteristics = await characteristicModel.createOrUpdate("characteristics", characteristics); 
            
            fullCharacters.push(createCharacter);
            fullCharacters.push(createCharacteristics);
            
            res.json(fullCharacters);

        } catch(e) {
            next(e);
        }
    },
        
    async updateCharacter (req, res, next) {

        let character;

        try {

            if (req.file) {         //si j'ai un fichier alors je recup le req.body[0]
                character = req.body; //je le nomme character
                character.url = req.file.path;  //je donne a la clef avatar le chemin du fichier enregister
            } else {    //si pas de fichier je ne fais rien et te laisse executer ton code
                console.error("Aucun fichier n'a été trouvé dans la requête");
                character = req.body
            }
                
            const updateCharacter = await characterModel.createOrUpdate("characters", character);

            res.json(updateCharacter);
        } catch(e) {
            next(e);
        }
    }
}

module.exports = characterController;