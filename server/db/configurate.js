module.exports = async (db) => {
    const collections = await db.collections();
    //const containsCollections = collections.length > 0;
    //if(containsCollections) return;
    collections.forEach(el => {
        el.drop();
    });
    const entities = require('./random-entities.js')
    const insertFunc =  (err, results)=>{
        if(err) console.error(err);
    }

    db.collection("subjects").insertMany(entities.subjects, insertFunc );     
    db.collection("objects").insertMany(entities.objects, insertFunc);     
    db.collection("relations").insertMany(entities.relations, insertFunc);     
    db.collection("dates").insertMany(entities.dates, insertFunc);     
}