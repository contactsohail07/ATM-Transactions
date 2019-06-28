const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/atm', { useNewUrlParser: true });


require('../models/account');

module.exports = {
    models:{
        Account: mongoose.model('Account'),
    }
}
