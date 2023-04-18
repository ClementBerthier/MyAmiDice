const jwt = require('jsonwebtoken');
/**
 * Ce middleware permet de vérifier la validité du token JSON Web Token (JWT) fourni dans les headers de la requête.
 * S'il n'y a pas de token, une erreur 401 avec un message "Aucun token n'a été fourni" sera renvoyée.
 * Si le token n'est pas valide, une erreur 401 avec un message "Token non valide" sera renvoyée.
 * Si le token est valide, la requête sera transmise au prochain middleware.
 *
 * @function
 * @async
 * @param {Object} req - L'objet request fourni par Express
 * @param {Object} res - L'objet response fourni par Express
 * @throws {Error} Si une erreur est levée lors de la vérification du token
 * @returns {undefined}
 */
const jwtMiddleware = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ msg: 'Aucun token n\'a été fourni' });
    }
  
    try {
      jwt.verify(token, process.env.TOKEN_KEY);
      
      next();
    } catch (err) {
      return res.status(401).json({ msg: 'Token non valide' });
    }
  };
  
  module.exports = jwtMiddleware;
  