const express = require('express');
const controller = require('../controllers/occurencies.js');
const router = express.Router();

const parse = (str) => require('date-and-time').parse(str,'YYYY-MM-DD')

 /**
 * Get all calendario event date occurencies between two dates (inclusively)
 * @route GET /occurencies/from/{start}/till/{end}
 * @param {string} start.param.required start date (YYYY-MM-DD) - eg: 2020-12-01
 * @param {string} end.param.required finish date (YYYY-MM-DD) - eg: 2021-01-05
 * @returns {Array} 200 - Occurencies array 
 */
 router.get('/from/:start/till/:end', (req, res, next) => controller.occurencies(req, res, next, parse(req.params.start), parse(req.params.end)))



 module.exports = router;