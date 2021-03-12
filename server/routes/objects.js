const express = require('express');
const controller = require('../controllers/objects.js');
const router = express.Router();

/**
 * Get all calendario objects
 * @route GET /objects
 * @param {string} type.query Only objects of specific type will be returned
 * @param {string} name.query Only objects with specific name wll be returned
 * @returns {Array} 200 - Objects array 
 */
router.get('/', controller.all)

/**
 * Get calendario object with specified id
 * @route GET /object/{id}
 * @param {string} id.path.required specified subject id - eg: 1
 * @returns {object} 200 - Object with specified id
 * @returns {Error}  404 - Can't find subject with such id
 */
router.get('/:id', controller.current)

module.exports = router;