const db = require('./dbClient');

/**
 * @namespace coreModel
 * @description Contient les méthodes pour exécuter des requêtes SQL pour interagir avec la base de données.
 */
const coreModel = {
  /**
   * @function getAll
   * @async
   * @param {string} table - Le nom de la table à sélectionner tous les enregistrements.
   * @returns {Array} Une liste d'objets représentant tous les enregistrements de la table.
   * @description Exécute une requête SQL pour sélectionner tous les enregistrements de la table spécifiée.
   */
  async getAll(table) {
    let query = `SELECT * FROM get_${table}()`;
    const result = await db.query(query);
    return result.rows;
  },
  /**
   * @function getById
   * @async
   * @param {string} table - Le nom de la table à sélectionner un enregistrement.
   * @param {number} id - L'identifiant de l'enregistrement à sélectionner.
   * @returns {Object} Un objet représentant l'enregistrement sélectionné.
   * @description Exécute une requête SQL pour sélectionner un seul enregistrement de la table spécifiée en fonction de l'identifiant.
   */
  async getById(table, id) {
    let values = id;
    let query = ` SELECT * FROM get_${table}_by_id(${values})`;
    const result = await db.query(query);
    return result.rows[0];
  },
  /**
   * @function deleteById
   * @async
   * @param {string} table - Le nom de la table à supprimer un enregistrement.
   * @param {number} id - L'identifiant de l'enregistrement à supprimer.
   * @returns {Object} Un objet représentant l'enregistrement supprimé.
   * @description Exécute une requête SQL pour supprimer un seul enregistrement de la table spécifiée en fonction de l'identifiant.
   */
  async deleteById(table, id) {
    let values = id;
    let query = ` SELECT * FROM delete_${table}_by_id(${values})`;
    const result = await db.query(query);
    return result.rows[0];
  },
  /**
   * @function createOrUpdate
   * @async
   * @param {string} table - Le nom de la table à mettre à jour ou créer un enregistrement.
   * @param {Object} data - Les données à utiliser pour mettre à jour ou créer l'enregistrement.
   * @returns {Object} - Le résultat de la mise à jour ou la création de l'enregistrement, sous forme d'objet JSON.
   * @throws {Error} - Renvoie une erreur en cas de problème avec la mise à jour ou la création de l'enregistrement.
   * @description Cette fonction permet de créer ou de mettre à jour un enregistrement dans la table spécifiée en utilisant les données fournies.
   */
  async createOrUpdate ( table, data) {
  
    let values = [];
    let nbDollar = [];
    let counter = 1;
    
    console.log('dataModel', table)
    console.log('dataModel', data)
    
    for( key in data) {
        
      console.log("key", key);
      
      values.push(data[key]);
      nbDollar.push(`$${counter}`)
      counter++;
    };
    
    console.log("values", values);
    console.log("nbDollar", nbDollar);
    
    let query = ` SELECT * FROM create_or_update_${table}_with_result( ${nbDollar.map( dollar => dollar)} ) `;
    
    console.log('query', query);
    
    const result = await db.query(query,  values );
    
    console.log("result", result)
    
    return result.rows[0];
    }
        
}

module.exports = coreModel;