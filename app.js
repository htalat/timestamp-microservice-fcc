var express = require('express');
var port = 8080;
var app = express();
var moment = require('moment');
var path  = require('path');

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, 'index.html'),function(err){
      if(err){
        console.log(err);
        res.status(500).send();
      }
  });
});

app.get('/:date',function(req,res){
    console.log('param:' + req.params.date);
    var date;
    var paramString = req.params.date;
    if(/^\d{8,}$/.test(paramString)) {
      date = moment(paramString,"X");
    }else{
      date = moment(paramString,"MMMM D, YYYY");
    }

    if(date.isValid()){
      res.json({
        unix: date.format("X"),
        natural: date.format("MMMM D, YYYY")
      });
    }else{
      res.json({
        unix: null,
        natural:null
      });
    }


});


app.listen(port,function(){
  console.log('listening on port: ' + port);
});
