const express = require('express');
const subjects = require('../controllers/subjects.js');
const router = express.Router();

router.get('/', subjects.all)
router.get('/:id', subjects.current)

module.exports = router;