'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CareerSchema = Schema({
    name: String,
    classroom: String
});

module.exports = mongoose.model('career', CareerSchema);