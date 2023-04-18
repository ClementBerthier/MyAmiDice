const coreModel = require('./coreModel');
const db = require('./dbClient');

const gameModel = {

    ...coreModel,

    async getGameByIdWithAll (gameID, userID) { //on attend 2 variable dans la fonction

        let gameWithAll;

            const sqlQuery = ` SELECT * FROM get_game_by_id_with_all($1, $2)`; // a mon avis on attend aussi $2
            // il faudra probablement bouclé ici pour prendre les 2 id en number et les mettre dans le tableau
            const values = [];
            values.push(Number(gameID));
            values.push(Number(userID));
            console.log("values", values);

            const result = await db.query(sqlQuery, values);

            console.log("result", result)

            gameWithAll = result.rows[0];

            console.log("game", gameWithAll);


        return gameWithAll;
    }

};

module.exports = gameModel;