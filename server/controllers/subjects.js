const name = 'subjects'
const notFoundError = 'Unable to find such subject';
function convertResultEntity(element) {
    delete element._id;
    element.$type = element.type;
    delete element.type;
}

const getCollection = (req) => req.app.locals[name];

module.exports.all = async function(req, res) {
    const result = await getCollection(req).find(req.query).toArray();
    result.forEach(convertResultEntity);
    res.json(result);
}
module.exports.current = async function(req, res){
    const id = req.params.id;
    const result = await getCollection(req).findOne({id})
    if(result == null){
        res.status(404).send(notFoundError);
        return;
    }
    convertResultEntity(result);
    res.json(result)
}
