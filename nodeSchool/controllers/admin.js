'use strict'

var Admin = require('../models/admin');
var Teacher = require('../models/teacher');
var bcrypt = require('bcrypt-nodejs');

var jwt = require('../services/jwt');
var multiparty = require('connect-multiparty');

function checkAdmin(req, res){
    var admin = new Admin();
    var params = req.body;

    console.log(params);

    res.status(200).send({
        message:'Method to test this function'
    });
}

function saveAdmin(req, res){
    var admin = new Admin();
    var params = req.body;
  
    console.log(params);
  
 
    if (params.name && params.surname && params.email && params.password){
      admin.name = params.name;
      admin.surname = params.surname;
      admin.email = params.email;
      admin.role = 'ROLE_ADMIN';
  
      Admin.findOne({email: admin.email.toLowerCase()}, (err, issetAdmin) => {
  
        if(err){
          res.status(500).send({message: 'User error'});
        }else{
          if(!issetAdmin){
            //res.status(200).send({message: 'AQUI VA A IR EL CIFRADO Y COMPARACION DE CONTRASENA'})
            bcrypt.hash(params.password, null, null, function(err, hash){
              admin.password = hash;
  
              admin.save((err, adminStored) => {
                if(err){
                  res.status(500).send({message: 'We couldnt save the user'});
                }else{
                  if(!adminStored){
                    res.status(404).send({message: 'Unable to record the user'});
                  }else{
                    res.status(200).send({admin: adminStored});
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
      res.status(200).send({message: 'Read all the fields, may some of them are wrong!'});
    }
  
  }

  function loginAdmin(req, res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    Admin.findOne({email: email}, (err, admin) => {
      if(err){
        res.status(500).send({
          message: 'An error occurred while loggin in the application'
        });
      }else{
        if(admin){
          bcrypt.compare(password, admin.password, (err, check) => {
            if(check){
              if(params.gettoken){
                res.status(200).send({
                  token: jwt.createToken(admin), message: 'Welcome dear Administrator!'
                });
              }
            }else{
              res.status(404).send({
                message: 'The user is unable to log-in correctly'
              });
            }
          });
        }else{
          Teacher.findOne({email:email}, (err, teacher) =>{
            if(err){
              res.status(500).send({message: 'There was an error in the login'});
            }else{
              if(teacher){
                bcrypt.compare(password, teacher.password, (err, check) =>{
                  if(check){
                    if(params.gettoken){
                      res.status(200).send({token: jwt.tokenCreated(teacher), message: 'Welcome dear teacher!'});
                    }else{
                      res.status(404).send({message: 'There cannot log-in this application'});
                    }
                  }
                })
              }
            }
          });
        }
      }
    });
  }

  function adminList(req, res){
    Admin.find({}, (err, admin) =>{
      if(err){
        console.log(err);
        res.status(500).send({
          message: 'We couldnt realise this pettition'
        });
      }else{
        res.status(200).send({admin});
      }
    });
  }

  function updateAdmin(req, res){
    var adminId = req.params.id;
    var update = req.body;
  
    Admin.findByIdAndUpdate(adminId, update, {new: true}, (err, adminUpdate) => {
      if(err){
        res.status(500).send({
          message: 'There was an error while updating the teacher'
        });
      }else{
        if(!adminUpdate){
          res.status(404).send({
            message: 'Unable to update the record from admin collection'
          });
        }else{
          res.status(200).send({
            admin: adminUpdate
          });
        }
      }
    });
  }

  function dropAdmin(req, res){
    var adminId = req.params.id;  
  
    Teacher.findOneAndDelete({ _id:adminId }, (err, adminDelete) => {
      if(err){
        res.status(500).send({
          message: 'There was an error, no way to drop the record'
        })
      }else{
        if(!adminDelete){
          res.status(404).send({
            message: 'Unable to delete the record'
          });
        }else{
          res.status(200).send({
            message: 'Record successfully deleted', admin: adminDelete
          });
        }
      }
    })
  }
module.exports = {
    checkAdmin,
    saveAdmin,
    loginAdmin,
    adminList,
    updateAdmin,
    dropAdmin
}