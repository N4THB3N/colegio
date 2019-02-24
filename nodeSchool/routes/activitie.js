'use strict'

var express = require('express');
var ActivitieController = require('../controllers/activitie');
var md_auth = require('../middlewares/authenticated');

var multiparty = require('connect-multiparty');
var md_upload = multiparty({uploadDir: './uploads/activitie'});

var api = express.Router();

api.post('/uploadActi', md_auth.ensureAut, ActivitieController.saveActi);
api.put('/updateActi/:id', md_auth.ensureAut, ActivitieController.updateActi);
api.put('/dropActi/:id', md_auth.ensureAut, ActivitieController.dropActi);
api.post('/subirImagen/:id', [md_auth.ensureAut, md_upload] ,ActivitieController.uploadImage);
api.get('/getImage/:imageFile' ,ActivitieController.getImage);

module.exports = api;