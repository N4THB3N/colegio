'use strict'

var express = require('express');
var AdminController = require('../controllers/admin');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();

api.get('/check', AdminController.checkAdmin);
api.post('/newAdmin', AdminController.saveAdmin);
api.post('/adminLogin', AdminController.loginAdmin);
api.get('/listAdmin', AdminController.adminList);
api.put('/updateAdmin/:id', md_auth.ensureAut, AdminController.updateAdmin);
api.put('/dropAdmin/:id', md_auth.ensureAut, AdminController.dropAdmin);

module.exports = api;