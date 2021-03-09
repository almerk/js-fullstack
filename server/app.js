require('dotenv').config({ path: '../.env' })
const express = require('express');
const db = require('./db.js');
const configurateDb = require('./db/configurate.js') 
const routes = require('./routes.js')
const { SERVER_PORT } = process.env;

const app = express();
app.use('/', routes);

db.connect(async (client) => {
    app.locals = await configurateDb(client.db());
    return app.listen(SERVER_PORT, () => { console.log(`Express server listening on port ${SERVER_PORT}`); });
});

process.on('SIGINT', () => { db.disconnect(); process.exit(); } );

