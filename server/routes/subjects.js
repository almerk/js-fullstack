const express = require('express');
const controller = require('../controllers/subjects.js');
const router = express.Router();

/**
 * Get all calendario subjects
 * @route GET /subjects
 * @param {string} groupId.query Only users with this groupId will be returned
 * @param {string} parentId.query Only groups with this parentId will be returned
 * @param {string} type.query Only subjects of specified type will be returned
 * @returns {Array} 200 - Subjects array 
 */
router.get('/', controller.all)

/**
 * Get calendario subject with specified id 
 * @route GET /subjects/{id}
 * @param {string} id.path.required specified subject id - eg: 1
 * @returns {object} 200 - Subject with specified id or login
 * @returns {Error}  404 - Can't find subject with such id 
 */
router.get('/:id', controller.current)

/**
 * Get calendario user with specified login
 * @route GET /subjects/user/{id}
 * @param {string} login.path.required specified login - eg: user
 * @returns {object} 200 - Subject with specified id or login
 * @returns {Error}  404 - Can't find subject with such login
 */
 router.get('/user/:login', controller.userByLogin)


module.exports = router;