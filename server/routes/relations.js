const express = require('express');
const controller = require('../controllers/relations.js');
const router = express.Router();

/**
 * Get all calendario objects
 * @route GET /relations
 * @returns {object} 200 - Relations array 
 */
router.get('/', controller.all)

/**
 * Get calendario object with specified id
 * @route GET /subject/{sId}/object/{oId}
 * @param {string} sId.path.required specified subject id - eg: 1
 * @param {string} oId.path.required specified object id - eg: 1
 * @returns {object} 200 - Object with specified id
 * @returns {Error}  404 - Can't find subject with such id
 */
router.get(['/subject/:sId/object/:oId','/object/:oId/subject/:sId'], (req, res, next) => controller.current(req, res, next, (req) => ({
    objectId: req.params.oId,
    subjectId: req.params.sId
})))

module.exports = router;