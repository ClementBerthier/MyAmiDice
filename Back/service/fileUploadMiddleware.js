const multer = require('multer')
/**
 * 
 * 
 * @typedef {import('multer').DiskStorage} DiskStorage
 * @typedef {import('multer').Instance} MulterInstance
 *
 * @param {string} destination - Le répertoire de destination pour les fichiers téléchargés.
 *
 * @returns {MulterInstance} - Une instance de multer avec la stratégie de stockage disque.
 */
const diskStorage = (destination) => {
  /**
   * @implements DiskStorage
   */
  return multer.diskStorage({
    /**
     * @param {import('express').Request} req - L'objet requête express.
     * @param {import('multer').File} file - L'objet fichier géré par multer.
     * @param {Function} cb - La fonction de callback pour définir la destination du fichier.
     *
     * @returns {void}
     */
    destination: (req, file, cb) => cb(null, destination),
    /**
     * @param {import('express').Request} req - L'objet requête express.
     * @param {import('multer').File} file - L'objet fichier géré par multer.
     * @param {Function} cb - La fonction de callback pour définir le nom du fichier.
     *
     * @returns {void}
     */
    filename: (req, file, cb) => cb(null, file.originalname)
  });
};

/**
 * @param {string} destination - Le répertoire de destination pour les fichiers téléchargés.
 *
 * @returns {MulterInstance} - Une instance de multer avec la stratégie de stockage disque.
 */
const fileUpload = (destination) => {
  return multer({ storage: diskStorage(destination) });
};

module.exports = fileUpload;
