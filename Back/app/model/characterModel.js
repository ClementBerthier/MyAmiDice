const db = require('./dbClient');
const coreModel = require('./coreModel');
const errorHandler = require('../../service/errorService/errorHandler');

const characterModel = {

    ...coreModel,

    async getCharacterByIdWithAll (id) {

        let characterWithAll;

            const sqlQuery = ` SELECT * FROM get_character_by_id_with_all($1)`;

            const values = [];
            values.push(Number(id));

            const result = await db.query(sqlQuery, values);

            characterWithAll = result.rows[0].character;

        return characterWithAll;
    }

};

module.exports = characterModel;