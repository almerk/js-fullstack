const express = require('express');
const controller = require('../controllers/subjects.js');
const router = express.Router();

/**
 * Get all calendario subjects
 * @route GET /subjects
 * @param {string} groupId.query Only users with this groupId will be returned
 * @param {string} parentId.query Only groups with this parentId will be returned
 * @param {string} type.query Only subjects of specified type will be returned
 * @returns {object} 200 - Subjects array 
 */
router.get('/', controller.all)

/**
 * Get calendario subject with specified id (or login)
 * @route GET /subjects/{id}
 * @param {string} id.path.required specified subject id - eg: 1
 * @returns {object} 200 - Subject with specified id or login
 * @returns {Error}  404 - Can't find subject with such id or login
 */
router.get('/:id', controller.current)


module.exports = router;