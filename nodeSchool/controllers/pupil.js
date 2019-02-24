'use strict'

var Pupil = require('../models/pupil');

function savePupil(req, res){
    var pupil = new Pupil();
    var params = req.body;

    if(req.see.role == 'ROLE_ADMIN'){
      if(params.name && params.surname){
        pupil.name = params.name;
        pupil.surname = params.surname;
        pupil.identity = params.identity;
        pupil.career = params.career;
        pupil.teacher = req.see.sub;

        pupil.save((err, pupilSave) =>{
            if(err){
                res.status(500).send({message: 'Unable to add a record on this collection'});
            }else{
                if(!pupilSave){
                    res.status(500).send({message: 'Unfortunate and sudden error just happened'});
                }else{
                    res.status(500).send({pupil: pupilSave});
                }
            }
        });
    }else{
        res.status(404).send({message: 'Some fields are required'});
    }
  }else{
    res.status(500).send({message: 'Only administrator is able to perform this'});
  }
}

function dropPupil(req, res){
    var pupilId = req.params.id;  

    if(req.see.role == 'ROLE_ADMIN'){
      Pupil.findOneAndDelete({ _id:pupilId }, (err, pupilDelete) => {
        if(err){
          res.status(500).send({
            message: 'There was an error, no way to drop the record'
          })
        }else{
          if(!pupilDelete){
            res.status(404).send({
              message: 'Unable to delete the record'
            });
          }else{
            res.status(200).send({
              message: 'Record successfully deleted', pupil: pupilDelete
            });
          }
        }
      });
    }else{
      res.status(500).send({message: 'Only administrator have permission to do this'});
    }
  }

  function updatePupil(req, res){
    var pupilId = req.params.id;
    var update = req.body;

    if(req.see.role == 'ROLE_ADMIN'){
      Pupil.findByIdAndUpdate(pupilId, update, {new: true}, (err, pupilUpdate) => {
        if(err){
          res.status(500).send({
            message: 'There was an error while updating the teacher'
          });
        }else{
          if(!pupilUpdate){
            res.status(404).send({
              message: 'Unable to update the record from admin collection'
            });
          }else{
            res.status(200).send({
              pupil: pupilUpdate
            });
          }
        }
      });
    }else{
      res.status(500).send({message: 'Just administrator is able to do this'});
    }
  }

  function listPupil(req, res){
    if(req.see.role == 'ROLE_ADMIN'){
      Pupil.find({}, (err, pupilList) => {
        if(err){
            console.log(err);
            res.status(500).send({message: 'No way to make a list'});
        }else{
            res.status(500).send({message:'Welcome administrator check out the list of students carefully', pupil:pupilList});
        }
    });
    }else{
      res.status(500).send({message: 'Just administrator'});
    }
  }


module.exports = {
    savePupil,
    dropPupil,
    updatePupil,
    listPupil
}