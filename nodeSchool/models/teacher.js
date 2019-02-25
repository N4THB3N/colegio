'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeacherSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    students: String,
    career: {type: Schema.ObjectId, ref: 'Career'},
});

module.exports = mongoose.model('Teacher', TeacherSchema);