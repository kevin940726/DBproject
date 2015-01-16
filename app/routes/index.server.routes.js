module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    app.get('/[a-z]{0,100}', index.render);
};