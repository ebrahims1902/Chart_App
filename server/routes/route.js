const express = require('express');
const router = express.Router();
var controller = require('../controller/create')


console.log("in route")
router.get('/getcurrency/timeseries',controller.currencyRoute)

module.exports = router;