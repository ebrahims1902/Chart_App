var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var exchange = new Schema({
    base: {
        type: String
    },
    rates: [{
        _id: false,
        date : {
            type: String
        },
        symbol: {
            type: String
        },
        value: {
            type: Number
        }
    }]

})
    
module.exports = mongoose.model('Exchanges',exchange)
