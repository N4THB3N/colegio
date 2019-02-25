'use strict'

var Teacher = require('../models/teacher');
var pupil = require('../models/pupil');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var fs= require('fs');
var path = require('path');


function probar(req, res){
    res.status(200).send({message: 'Lets check this controller'});
}

function saveTeacher(req, res){
    var teacher = new Teacher();
    var params = req.body;
  
    if(req.see.role == 'ROLE_ADMIN'){
      if(params.name && params.surname){
        teacher.name = params.name;
        teacher.surname = params.surname;
        teacher.email = params.email;
        teacher.role = 'ROLE_TEACHER';
        teacher.career = params.id;

        Teacher.findOne({email: teacher.email.toLowerCase()}, (err, issetTeacher) => {
  
          if(err){
            res.status(500).send({message: 'User error'});
          }else{
            if(!issetTeacher){
              bcrypt.hash(params.password, null, null, function(err, hash){
                teacher.password = hash;
    
                teacher.save((err, teacherStored) => {
                  if(err){
                    res.status(500).send({message: 'We couldnt save the user'});
                  }else{
                    if(!teacherStored){
                      res.status(404).send({message: 'Unable to record the user'});
                    }else{
                      res.status(200).send({teacher: teacherStored});
                    }
                  }
                });
              });
            }else{
              res.status(200).send({message: 'Cannot make a record of the user'});
            }
          }
        });
    }else{
        res.status(404).send({message: 'Fill the fields up correctly'});
    }
    }else{
      res.status(500).send({message: 'Just administrator can do this'});
    }
}

function updateTeacher(req, res){
  var teacherId = req.params.id;
  var update = req.body;

  if(req.see.role == 'ROLE_ADMIN'){
    
  Teacher.findByIdAndUpdate(teacherId, update, {new: true}, (err, teacherUpdate) => {
    if(err){
      res.status(500).send({
        message: 'There was an error while updating the teacher'
      });
    }else{
      if(!teacherUpdate){
        res.status(404).send({
          message: 'Unable to update the record from teacher collection'
        });
      }else{
        res.status(200).send({
          teacher: teacherUpdate
        });
      }
    }
  });
  }else{
    res.status(500).send({message: 'Just admins can do this'});
  }
}

function dropTeacher(req, res){
  var teacherId = req.params.id;  

  if(req.see.role == 'ROLE_ADMIN'){
    Teacher.findOneAndDelete({ _id:teacherId }, (err, teacherDelete) => {
      if(err){
        res.status(500).send({
          message: 'There was an error, no way to drop the record'
        })
      }else{
        if(!teacherDelete){
          res.status(404).send({
            message: 'Unable to delete the record'
          });
        }else{
          res.status(200).send({
            message: 'Record successfully deleted', teacher: teacherDelete
          });
        }
      }
    });
  }else{
    res.status(500).send({message: 'Just admins are able to drop this king of records'});
  }
}

  function listTeacher(req,res){
    if(req.see.role == 'ROLE_ADMIN'){
      Teacher.find({}, (err, teachers) => {
        if(err){
          console.log(err);
          res.status(500).send({message: 'Esta cosa no se pudo'})
        }else{
            res.status(200).send({message: 'Welcome administrator go ahead with the list', teachers});
        }
      });
    }else{
      res.status(500).send({message: 'Access given just by administrator for administrators!'});
    }
  }

  function student(req, res){
    var params = req.body;
    var name = params.name;

      if(req.see.role == 'ROLE_TEACHER'){
        Teacher.findOne({name:name}, (err, teacherNa) => {
          if(err){
            res.status(500).send({message: 'Error'});
          }else{
            if(teacherNa){
               pupil.find({teacher:teacherNa._id}, (err, otroError) =>{
                teacherNa['students'] = otroError;
                var students = teacherNa.students;
                 res.status(500).send({students});
               }); 
            }else{
              res.status(500).send({message: 'No user found'});
            }
          }
        });
      }else{
        res.status(500).send({message: 'Only for the teachers'})
      }
  }

  function encontrarTodos(req, res){
    if(req.see.role == 'ROLE_ADMIN'){
      var result = {};

      Teacher.find({}, (err, teachers) =>{
        teachers.forEach((teacher) => {
          pupil.find({teacher: teacher._id}, (err, students) =>{
            result[teacher.name] = students;
         });
        });
      });
        res.status(200).send({result});
    }else{
      res.status(500).send({message: 'Admin is the only one which is allowed to this'});
    }
  }

module.exports =  {
    probar,
    saveTeacher,
    updateTeacher,
    listTeacher,
    dropTeacher,
    student,
    encontrarTodos
}