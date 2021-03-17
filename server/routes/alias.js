const express = require('express');
const router = express.Router();
const aliasRedirected=true;

const aliasTypeRedirect = (url, type) => function(req, res){
    console.log(`\tAlias for ${url}?type=${type} worked`);
    req.url = url;
    req.query = { ...req.query, type, aliasRedirected };
    req.app.handle(req, res);
}

/**
 * Get all calendario users
 * This request is alias for /subjects?type=user
 * @route GET /users
 * @returns {Array} 200 - Users array
 */
router.get('/users', aliasTypeRedirect("/subjects", "user"))

/**
 * Get calendario user with specified login
 * This request is alias for /subjects/user/:login?
 * @param {string} login.path.required specified login - eg: user
 * @returns {object} 200 - Subject with specified id or login
 * @returns {Error}  404 - Can't find subject with such login
 */
 router.get('/users/:login', (req, res, next) => {
    console.log('\t Alias for subjects/user/:login worked')
    req.url=`/subjects/user/${req.params.login}`
    req.app.handle(req, res, next)
 })
/**
 * Get all calendario groups
 * This request is alias for /subjects?type=group
 * @route GET /groups
 * @returns {Array} 200 - Subjects array 
 */
router.get('/groups', aliasTypeRedirect("/subjects", "group"))

/**
 * Get all calendario calendar types
 * This request is alias for /object?type=calendarType
 * @route GET /calendarTypes
 * @returns {Array} 200 - Calendar types array 
 */
router.get('/calendarTypes', aliasTypeRedirect("/objects", "calendarType"))

 /**
 * Get all calendars
 * This request is alias for /object?type=calendar
 * @route GET /calendars
 * @returns {Array} 200 - Calendar types array 
 */
router.get('/calendars', aliasTypeRedirect("/objects", "calendar"))

   /**
 * Get all events
 * @route GET /calendarEvents
 * @returns {Array} 200 - Calendar types array 
 */
router.get('/calendarEvents', aliasTypeRedirect("/objects", /\w*Event/i))

module.exports = router;
