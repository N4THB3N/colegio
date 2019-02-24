'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_del_proyecto';

exports.ensureAut = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(404).send({message: 'Please check the header authentification out!'});
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');
    try{
        var payload = jwt.decode(token, secret);
        if(payload.ex <= moment().unix()){
            return res.status(404).send({
                message: 'The token has expired!'
            })
        }
    }catch(exp){
        return res.status(404).send({message: 'Invalid token'});
    }
    req.see = payload;
    next();
}