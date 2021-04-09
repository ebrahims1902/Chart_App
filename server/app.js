const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route')
const app = express();
// const config = require('./lib/config')
const db = require('./lib/database');

const port = process.env.PORT || 3001;      
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.init();
app.use('/api', route);
console.log("Start")
app.listen(port);
console.log('Listening port on ' + port);