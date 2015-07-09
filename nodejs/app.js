var config = require("nconf");
var express = require('express');

var app = express();


config.argv()
    .env()
    .file({ file: 'config.json' });

//boot
require('./boot/index')(app);

// routing
require('./routes/index')(app);




