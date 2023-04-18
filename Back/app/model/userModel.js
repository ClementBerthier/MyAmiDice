const coreModel = require('./coreModel');
const db = require('./dbClient');

const userModel = {

    ...coreModel,

    async insertUser(user) {

        let createUser;

        try {

            let values = [];
            let nbDollar = [];
            let counter = 1;

            for( key in user) {

                console.log("key", key);

                values.push(user[key]);
                nbDollar.push(`$${counter}`)
                counter++;
            };

            const sqlQuery = ` SELECT * FROM create_users_with_result( ${nbDollar.map( dollar => dollar)}) `;   
            console.log("query", sqlQuery)         
            const result = await db.query(sqlQuery, values);
            console.log("result", result)
            createUser = result.rows[0];
        } catch(e) {
            console.log(e);
        }
        
        console.log("user", createUser)
        return createUser;
    },

    async updateUser(user) {

        let updateUser;
        let values = [];
        let nbDollar = [];
        let counter = 1;

        for( key in user) {

            console.log("key", key);

            values.push(user[key]);
            nbDollar.push(`$${counter}`)
            counter++;
        };

        try {

            const sqlQuery = ` SELECT * FROM update_users_with_result(  ${nbDollar.map( dollar => dollar)} )`;

            const result = await db.query(sqlQuery, values);

            updateUser = result.rows[0];
 
        } catch(e) {
            console.log(e);
            
        }

        return updateUser;
    },

    async loginUser (user) {

        let userData;
        let values = [];
        let nbDollar = [];
        let counter = 1;

        for( key in user) {

            console.log("key", key);

            values.push(user[key]);
            nbDollar.push(`$${counter}`)
            counter++;
        }

        try {

            const sqlQuery = ` SELECT * FROM user_login(  ${nbDollar.map( dollar => dollar)} )`;
            console.log(sqlQuery)
            console.log(values)
            
            const result = await db.query(sqlQuery, values);

            userData = result.rows[0];

            console.log("user", userData);

        } catch(e) {
            console.log("error", e);
        }

        return userData;
    }

};

module.exports = userModel;