'use strict'

var Career = require('../models/career');
var bcrypt = require('bcrypt-nodejs');
var auth = require('../middlewares/authenticated');
var jwt = require('../services/jwt');
var multiparty = require('connect-multiparty');
var tipo = auth.ver;


function saveCareer(req, res){
    var career = new Career();
    var params = req.body;

    if(req.see.role == 'ROLE_ADMIN'){
      if(params.name && params.classroom){
        career.name = params.name;
        career.classroom = params.classroom;

        career.save((err, careerSave) =>{
            if(err){
                res.status(500).send({message: 'Unable to add a record on this collection'});
            }else{
                if(!careerSave){
                    res.status(500).send({message: 'Unfortunate and sudden error just happend'});
                }else{
                    res.status(500).send({carrer: careerSave, admin: req.admin});
                }
            }
        });
    }else{
        res.status(404).send({message: 'Some fields are required'});
    }
    }else{
      res.status(500).send({message: 'You need permission from the administrator to do this'});
    }
}

function listCareer(req,res){
  if(req.see.role == 'ROLE_ADMIN'){
    Career.find({}, (err, career) => {
      if(err){
        console.log(err);
        res.status(500).send({message: 'Esta cosa no se pudo'})
      }else{
        res.status(200).send({career});
      }
    });
  }else{
    res.status(500).send({message: 'The record of careers is wrong'});
  }
}

function updateCareer(req, res){
    var careerId = req.params.id;
    var update = req.body;

    if(req.see.role == 'ROLE_ADMIN'){
      Career.findByIdAndUpdate(careerId, update, {new: true}, (err, careerUpdate) => {
        if(err){
          res.status(500).send({
            message: 'There was an error while updating the teacher'
          });
        }else{
          if(!careerUpdate){
            res.status(404).send({
              message: 'Unable to update the record from the collection'
            });
          }else{
              res.status(200).send({
                career: careerUpdate
              });
            
          }
        }
      });
    }else{
      res.status(500).send({
        message: 'Theres no way for you to update one of the careers, permission is only given by administrator'
      });
    }
  }

  function dropCareer(req, res){
    var careerId = req.params.id;  

    if(req.see.role == 'ROLE_ADMIN'){
      Career.findOneAndDelete({ _id:careerId }, (err, careerDelete) => {
        if(err){
          res.status(500).send({
            message: 'There was an error, no way to drop the record'
          })
        }else{
          if(!careerDelete){
            res.status(404).send({
              message: 'Unable to delete the record'
            });
          }else{
              res.status(200).send({
                message: 'Record successfully deleted', career: careerDelete
              });
          }
        }
      });
    }else{
      res.status(500).send({message: 'No way to drop this record'});
    }
  }


module.exports = {
    saveCareer,
    listCareer,
    updateCareer,
    dropCareer
}