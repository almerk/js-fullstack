module.exports = async (db) => {
    const collections = await db.collections();
    //const containsCollections = collections.length > 0;
    //if(containsCollections) return;
    collections.forEach(el => {
        el.drop();
    });
    const entities = require('./random-entities.js')
    const insertFunc =  (err, results)=>{
        if(err) { console.error(err); throw "Db configuration error."} 
    }

    db.collection("subjects").insertMany(entities.subjects, insertFunc );     
    db.collection("objects").insertMany(entities.objects, insertFunc);     
    db.collection("relations").insertMany(entities.relations, insertFunc);     
    
    return {
        subjects: db.collection("subjects"),
        objects: db.collection("objects"),
        relations: db.collection('relations'),
    }
}