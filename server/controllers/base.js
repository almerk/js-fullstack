module.exports = function(collectionName, {notFoundErrorText} = { }){
    const getCollection = (req) => req.app.locals[collectionName];
    const convertResultEntity = (entity) => {
        delete entity._id;
        entity.$type = entity.type;
        delete entity.type;
    };
    const transformQuery = (query)=>{
        const res = { ... query };
        delete res.aliasRedirected;
        return res;

    }
    return {
        async all(req, res, next) {
            const result = await getCollection(req).find(transformQuery(req.query)).toArray();
            result.forEach(convertResultEntity);
            res.json(result);
        },
        async current(req, res, next, selectRule = (req) => ({ id: req.params.id  })) {
            const filter = selectRule(req);
            const result = await getCollection(req).findOne(filter);
            if(result == null){
                res.status(404).send(notFoundErrorText);
                return;
            }
            convertResultEntity(result);
            res.json(result)
        },
        getCollection
    }
}