const express = require('express');
const router = express.Router();

/**
 * Get all calendario users
 * @route GET /users
 * @returns {object} 200 - An array of user subjects 
 */
router.get('/users', (req, res) => {
    console.log('\tAlias worked');
    req.url = "/subjects";
    req.query.type="user";
    req.app.handle(req, res);
})
/**
 * Get all calendario groups
 * @route GET /groups
 * @returns {object} 200 - An array of group subjects 
 */
router.get('/groups', (req, res) => {
    console.log('\tAlias worked');
    req.url = "/subjects";
    req.query.type="group";
    req.app.handle(req, res);
})

module.exports = router;
