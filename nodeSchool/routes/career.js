'use strict'

var express = require('express');
var CareerController = require('../controllers/career');
var md_auth = require('../middlewares/authenticated');
var multiparty = require('connect-multiparty');

var api = express.Router();

api.post('/saveCareer', md_auth.ensureAut, CareerController.saveCareer);
api.get('/listCareer', md_auth.ensureAut, CareerController.listCareer);
api.put('/updateCareer/:id', md_auth.ensureAut, CareerController.updateCareer);
api.put('/deleteCareer/:id', md_auth.ensureAut, CareerController.dropCareer);

module.exports = api;