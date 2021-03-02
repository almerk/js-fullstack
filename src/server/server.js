const express = require('express');
const path = require('path');
const state = require('./state.js');
const app = express();
const SERVER_PORT = 1337;

const db = state(path.resolve('./src/server/db/db.json'));
Object.keys(db).forEach(key => {
    const values = db[key];
    app.get(`/${key}`, (req, res) => {res.send(values)});
    
    if(values.length > 0 && values[0].id) {
        app.get(`/${key}/:id`, (req, res) => {
            const entity = values.find(x => x.id == req.params.id)
            entity ? res.send(entity) : res.status(404).send();
        });
    }    
});

app.listen(SERVER_PORT, () => { console.log(`Express server listening on port ${SERVER_PORT}`); });

