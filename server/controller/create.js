'use strict'
var exchange = require('../model/exchangeRate')
const request = require('request');


async function currencyRoute(req, res) {
    let dataquery = await exchangeBackendApi(req)
    return res.status(dataquery.status).send(dataquery)
}

function exchangeBackendApi(req,response) {
    return new Promise(async function(resolve,reject) {
        let start_date = req.query.start_date;
        let end_date = req.query.end_date;
        let to = req.query.symbols;
        let from = req.query.base;

        let query = `https://api.exchangerate.host/timeseries?start_date=${start_date}&end_date=${end_date}&symbols=${to}&base=${from}&places=3`
        await request(query, { json: true },async function (err, res, body) {
            if (err) { 
                console.log(err);
                return reject(err) 
            }
            response =  res.body;
            let obj = response.rates
            var mgoobj = {
                base: from,
                rates: []
            };
            Object.keys(obj).forEach(key => {
                let value = obj[key];
                mgoobj.rates.push({ 
                    "date" : key,
                    "symbol"  : Object.keys(value)[0],
                    "value"       :Object.values(value)[0]
                });
            });
            console.log("my final object: ",mgoobj)

            let queryres = await dbquerypost(mgoobj)

                return resolve(queryres)

        });
        
    })
}

function dbquerypost(data){
    return new Promise(async function(resolve,reject) {
        var newStore = new exchange(data);
        await newStore.save(function(err,res) {
            if (err) {
                console.log(err)
                let retres = {}
                retres.status = 400
                retres.message = "failure"
                retres.error = err
                return reject(retres)
            }
            console.log(">>GOT RES",res._id)
            let retres = {}
            retres.status = 200
            retres.message = "success"
            retres.id = res._id
            return resolve(retres)
        })
    })
}


module.exports = {
    currencyRoute: currencyRoute
}

