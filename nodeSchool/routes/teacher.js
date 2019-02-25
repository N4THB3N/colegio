'use strict'

var express = require('express');
var TeacherController = require('../controllers/teacher');
var md_auth = require('../middlewares/authenticated');
var multiparty = require('connect-multiparty');

var api = express.Router();

api.get('/proobeTeacher', TeacherController.probar);
api.post('/saveTeacherIn', md_auth.ensureAut, TeacherController.saveTeacher);
api.put('/justUpdate/:id', md_auth.ensureAut, TeacherController.updateTeacher);
api.put('/quitTeacher/:id', md_auth.ensureAut, TeacherController.dropTeacher);
api.get('/listTeachers', md_auth.ensureAut, TeacherController.listTeacher);
api.post('/listPu', md_auth.ensureAut, TeacherController.student);
api.get('/findEverybody', md_auth.ensureAut, TeacherController.encontrarTodos);


module.exports = api;