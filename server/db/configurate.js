module.exports = async (db) => {
    const collections = await db.collections();
    const containsCollections = collections.length > 0;
    if(containsCollections) return;
    const entities = require('./random-entities.js')
    console.log(entities);
}