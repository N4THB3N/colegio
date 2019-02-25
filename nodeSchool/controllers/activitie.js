'use strict'

var Activitie = require('../models/activitie');
var multiparty = require('connect-multiparty');

var fs= require('fs');
var path = require('path');

function saveActi(req, res){
  var activitie = new Activitie();
  var params = req.body;

  if(params.name && params.description){
      activitie.name = params.name;
      activitie.description = params.description;
      activitie.teacher = req.see.sub;

      if(req.see.role == 'ROLE_TEACHER'){
        activitie.save((err, actiSave) =>{
          if(err){
              res.status(500).send({message: 'Unable to add a record on this collection'});
          }else{
              if(!actiSave){
                  res.status(500).send({message: 'Unfortunate and sudden error just happened'});
              }else{
                  res.status(500).send({actiSave});
              }
          }
      });
      }else{
        res.status(500).send({
          message: 'This request must be done by a teacher, not another user'
        });
      }
  }else{
      res.status(404).send({message: 'Some fields are required'});
  }
}

function dropActi(req, res){
  var actiId = req.params.id;  

  if(req.see.role == 'ROLE_TEACHER'){
    Activitie.findOneAndDelete({ _id:actiId }, (err, actiDelete) => {
      if(err){
        res.status(500).send({
          message: 'There was an error, no way to drop the record'
        })
      }else{
        if(!actiDelete){
          res.status(404).send({
            message: 'Unable to delete the record'
          });
        }else{
          res.status(200).send({
            message: 'Record successfully deleted', activitie: actiDelete
          });
        }
      }
    });
  }else{
    res.status(500).send({message: 'Over one user have tried to do this, be careful'});
  }
}

function updateActi(req, res){
  var actiId = req.params.id;
  var update = req.body;

  if(req.see.role == "ROLE_TEACHER"){
    Activitie.findByIdAndUpdate(actiId, update, {new: true}, (err, actiUpdate) => {
      if(err){
        res.status(500).send({
          message: 'There was an error while updating the teacher'
        });
      }else{
        if(!actiUpdate){
          res.status(404).send({
            message: 'Unable to update the record from admin collection'
          });
        }else{
          res.status(200).send({
            activitie: actiUpdate
          });
        }
      }
    });
  }else{
    res.status(500).send({message: 'Just teachers are enabled with this action!'});
  }
}

function uploadImage(req, res){
  var teacherId = req.params.id;
  var file_name = 'Archivo no subido';

  if(req.see.role == 'ROLE_TEACHER'){
    if(req.files){
      var file_path = req.files.image.path;
      var file_split = file_path.split('\\');
      var file_name = file_split[2];
  
      var ext_explit = file_name.split('\.');
      var file_ext = ext_explit[1];
  
      if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpge' || file_ext == 'gif'){
        Activitie.findByIdAndUpdate(teacherId, {image: file_name}, {new:true}, (err, teacherUpdate) =>{
          if(err){
            res.status(500).send({
              message: 'Error al actualizar el usuario'
            });
          }else{
            if(!teacherUpdate){
              res.status(404).send({
                message: 'No se ha podido actualizar el usuario'
              });
            }else{
              res.status(200).send({activitie: teacherUpdate, image: file_name});
            }
          }
        });
      }else{
        //res.status(200).send({message: 'Extension no admitida'});
        fs.unlink(file_path, (err) =>{
          if(err){
            res.status(200).send({
              message: 'La extension no es admitida'
            });
          }else{
            res.status(200).send({message: 'Extension no admitida'});
          }
        });
      }
    }else{
      res.status(404).send({message: 'No se han subido archivos'});
    }
  }else{
    res.status(500).send({message: 'Please check out the headers part'});
  }
}

  
  function getImage(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/activitie/'+imageFile;
  
    fs.exists(path_file, function(exists){
      if(exists){
        res.sendFile(path.resolve(path_file));
      }else{
        res.status(404).send({
          message: 'La imagen no existe'
        });
      }
    });
  
    //res.status(200).send({message: 'Metodo para la cosa de imagen'});
  }

  function listActi(req, res){
    Activitie.find({}, (err, ActivieFind) =>{
      res.status(500).send({ActivieFind});
    });
  }

  module.exports = {
      getImage,
      uploadImage,
      saveActi,
      dropActi,
      updateActi,
      listActi
  }