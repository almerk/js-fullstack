const express = require('express');
const path = require('path');
const db = require('./db.js');
const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 8081;

const state = db(path.resolve(__dirname + '/db/db.json'));
Object.keys(state).forEach(key => {
    const values = state[key];
    app.get(`/${key}`, (req, res) => {res.send(values)});
    
    if(values.length > 0 && values[0].id) {
        app.get(`/${key}/:id`, (req, res) => {
            const entity = values.find(x => x.id == req.params.id)
            entity ? res.send(entity) : res.status(404).send();
        });
    }    
});

app.listen(SERVER_PORT, () => { console.log(`Express server listening on port ${SERVER_PORT}`); });

