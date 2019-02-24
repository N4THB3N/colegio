'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var admin_routes = require('./routes/admin');
var teacher_routes = require('./routes/teacher');
var career_routes = require('./routes/career');
var pupil_routes = require('./routes/pupil');
var activitie_routes = require('./routes/activitie');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/v1', admin_routes);
app.use('/v1', teacher_routes);
app.use('/v1', career_routes);
app.use('/v1', pupil_routes);
app.use('/v1', activitie_routes);

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

module.exports = app;