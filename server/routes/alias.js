const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
    req.url = "/subjects";
    req.query.type="user";
    req.app.handle(req, res);
})
router.get('/groups', (req, res) => {
    req.url = "/subjects";
    req.query.type="group";
    req.app.handle(req, res);
})

module.exports = router;
