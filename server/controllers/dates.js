
const controller = require('./base.js')('dates', {
    notFoundErrorText: 'Unable to find such date'
})
const computeOccurencies = require('../logic/occurencies.js');

controller.occurencies = async (req, res, next, start, end) => {
    const collection = controller.getCollection(req);
    const values = await collection.find(controller.transformQuery(req.query)).toArray();
    const occurencies = computeOccurencies(values, start, end);
    res.json(occurencies);
}

module.exports = controller;