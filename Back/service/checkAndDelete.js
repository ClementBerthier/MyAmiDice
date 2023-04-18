/**
 * Vérifie et supprime les jeux ayant un statut "Terminé"
 * qui ont été mis à jour il y a plus de deux semaines.
 * 
 * @async
 * @returns {void}
 */
async function checkAndDelete() {
    // Récupère les jeux avec le statut "Terminé"
    const query = `SELECT * FROM games WHERE status = 'Terminé'`;
    const result = await db.query(query);
    const games = result.rows;
    
    // Boucle sur les jeux et vérifie si la mise à jour est antérieure à deux semaines
    const twoWeeksAgo = new Date(Date.now() - 2 * 7 * 24 * 60 * 60 * 1000);
    const values = games.filter(game => game.updated_at < twoWeeksAgo).map(game => game.id);
    
    // Supprime les jeux qui respectent la condition
    const deleteQuery = `DELETE FROM "Games" WHERE id = ANY($1)`;
    const deleteResult = await db.query(deleteQuery, [values]);
    console.log(deleteResult.rowCount, "jeux ont été supprimés.");
  }
  
  // Exécute la fonction toutes les semaines
  setInterval(checkAndDelete, 7 * 24 * 60 * 60 * 1000);
  