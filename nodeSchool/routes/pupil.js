'use strict'

var express = require('express');
var PupilController = require('../controllers/pupil');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.post('/savePupil', md_auth.ensureAut, PupilController.savePupil);
api.put('/dropPupil/:id', md_auth.ensureAut, PupilController.dropPupil);
api.put('/updatePupil/:id', md_auth.ensureAut, PupilController.updatePupil);
api.get('/listPupil', md_auth.ensureAut, PupilController.listPupil);

module.exports = api;