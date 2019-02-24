'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 4022;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/proyectoColegio', {useNewUrlParser:true})
.then((err,res) => {
    console.log('Swited to DataBase!');
    app.listen(port, () =>{
        console.log('Node server and express and working indeed!')
    });
})

.catch(err => console(err));