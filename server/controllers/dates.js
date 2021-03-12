
const controller = require('./base.js')('dates', {
    notFoundErrorText: 'Unable to find such date'
})

controller.occurencies = (req, res, next)=>{
    res.json([{ 
        eventId:'1', 
        dateTime: {
            value: new Date(),
            hasTime: true,
            belonging: null,
            status: null
        } 
}]);
}

module.exports = controller;