'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PupilSchema = Schema({
    name: String,
    surname: String,
    identity: Number,
    career: {type: Schema.ObjectId, ref: 'Career'},
    teacher: {type: Schema.ObjectId, ref: 'Teacher'}
});

module.exports = mongoose.model('Pupil', PupilSchema);