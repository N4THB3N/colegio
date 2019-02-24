'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_del_proyecto';

exports.createToken = function(admin){
    var payload = {
        sub: admin._id,
        name: admin.name,
        surname: admin.surname,
        email: admin.email,
        password: admin.password,
        role: admin.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };
    return jwt.encode(payload, secret);
}

exports.tokenCreated = function(teacher){
    var another = {
        sub: teacher._id,
        name: teacher.name,
        surname: teacher.surname,
        role: teacher.role,
        career: teacher.career,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };
    return jwt.encode(another, secret);
}