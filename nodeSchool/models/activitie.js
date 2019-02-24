'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitieSchema = Schema({
    name: String,
    description: String,
    teacher: {type:Schema.ObjectId, ref: 'Teacher'}
});


module.exports = mongoose.model('Activitie', ActivitieSchema);

