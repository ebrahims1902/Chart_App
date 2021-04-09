'use strict';
var mongoose = require('mongoose');



var database = function () {
    var conn = null,

        init = function () {
            var mgohost = "";
            if (process.env.NODE_ENV == "production") {
                mgohost = process.env.MGOCONNECT
            } else {
                mgohost = "mongodb://localhost:27017/charts"
            }
            console.log('Trying to connect to ' + mgohost );
            var options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            };
            var connString = mgohost;
            mongoose.connect(connString,options);
            conn = mongoose.connection;
            conn.on('error', console.error.bind(console, 'connection error:'));
            conn.once('open', function() {
                console.log('db connection open');
            });
            return conn;
        },

        close = function() {
            if (conn) {
                conn.close(function () {
                    console.log('Mongoose default connection disconnected through app termination');
                    process.exit(0);
                });
            }
        }

    return {
        init:  init,
        close: close
    };

}();

module.exports = database;