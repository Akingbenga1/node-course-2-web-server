const express = require('express');

const fs =  require('fs');

const hbs = require('hbs');

const g = new Date().get


var app = express();

hbs.registerPartials(__dirname+"/views/partials");

app.set('view engine', 'hbs');


app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next){
  var now = new Date().toString();
  var log = now + ":" + req.method  + " " + req.url;
  console.log(log);
  fs.appendFile('server.log', log + "\n", function(err){

    if(err)
    {
      console.log('unable to append to server.log');
    }
  });
  next();
});


//
// app.use(function(req,res, next){
//
// res.render("maintain.hbs", {pageTitle: "Maintan Page"})
//
// });
//


hbs.registerHelper('getCurrentYear', function(){

  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function(text){

  return text.toUpperCase();
});


app.get('/about', function(req,res){

res.render("about.hbs", {pageTitle: "About Page"})

});


app.use(function(req,res, next){

res.render("maintain.hbs", {pageTitle: "Maintan Page"})

});



app.get('/home', function(req,res){

res.render("home.hbs", {pageTitle: "About Page",
                        welcomeMessage : "welcome Gbenga"})

});


app.get('/', function(req,res){

res.send({name: "Akinbami Gbenga",
            like: ["Biking", "Cities"]
          });

});

app.get('/errorPage', function(req,res){

res.send({ErrorMessage: "OOPs 404 Error Page"});
});


app.listen(3000, function()
{
  console.log("Server is up on port 3000");
});
