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
 * @returns {object} 200 - Users array
 */
router.get('/users', aliasTypeRedirect("/subjects", "user"))
/**
 * Get all calendario groups
 * This request is alias for /subjects?type=group
 * @route GET /groups
 * @returns {object} 200 - Subjects array 
 */
router.get('/groups', aliasTypeRedirect("/subjects", "group"))

/**
 * Get all calendario calendar types
 * This request is alias for /object?type=calendarType
 * @route GET /calendarTypes
 * @returns {object} 200 - Calendar types array 
 */
 router.get('/calendarTypes', aliasTypeRedirect("/objects", "calendarType"))

 /**
 * Get all calendars
 * This request is alias for /object?type=calendar
 * @route GET /calendars
 * @returns {object} 200 - Calendar types array 
 */
  router.get('/calendars', aliasTypeRedirect("/objects", "calendar"))

   /**
 * Get all events
 * @route GET /calendarEvents
 * @returns {object} 200 - Calendar types array 
 */
    router.get('/calendarEvents', aliasTypeRedirect("/objects", /\w*Event/i))

module.exports = router;
