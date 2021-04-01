const getCollection = (req) => req.app.locals['objects'];
const computeOccurencies = require('../logic/occurencies.js');

const occurencies = async (req, res, next, start, end) => {
    const objectsCollection = getCollection(req);
    const values = await objectsCollection.find({ type: /\w*Event/i }).project({ id: true, dates: true, _id: false }).toArray();
    const occurencies = values
        .map(x => computeOccurencies(x.dates, start, end))
        .reduce((a, b) => a.concat(b), [])
        .sort((a, b) => a.dateTime.value - b.dateTime.value);
    res.json(occurencies);
}

module.exports = {
    occurencies
}