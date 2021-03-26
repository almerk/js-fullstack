const express = require('express');
const router = express.Router();
const alias = require('./routes/alias.js')
const subjects = require("./routes/subjects");
const objects = require("./routes/objects");
const relations = require("./routes/relations");
const occurencies = require("./routes/occurencies");
const date = require('date-and-time')

router.use(function (req, res, next) {
    const happened = date.format(new Date(),'YYYY/MM/DD HH:mm:ss');
    console.log(`Time:${happened}\tUrl:${req.url}`);
    next();
  });

router.use('/', alias)

router.use('/subjects', subjects)
router.use('/objects', objects)
router.use('/relations', relations)
router.use('/occurencies', occurencies)
router.use('*', (req, res) => {
    console.log('\tRoute not found!')
    res.status(404).sendFile(__dirname + '/404.html')}
)


module.exports = router;