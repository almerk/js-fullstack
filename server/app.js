require('dotenv').config({ path: '../.env' })
const express = require('express');
const db = require('./db.js');
const configurateDb = require('./db/configurate.js') 
const { SERVER_PORT } = process.env;

const app = express();

db.connect(async (client) => {
    await configurateDb(client.db());
    return app.listen(SERVER_PORT, () => { console.log(`Express server listening on port ${SERVER_PORT}`); });
});

process.on('SIGINT', () => { db.disconnect(); process.exit(); } );

