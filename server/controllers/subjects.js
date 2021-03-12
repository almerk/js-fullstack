
const controller = require('./base.js')('subjects', {
    notFoundErrorText: 'Unable to find such subject'
})
controller.userByLogin = (req,res,next) => controller.current(req, res, next, (req) => ({
    type: 'user',
    login: req.params.login
}));

module.exports = controller