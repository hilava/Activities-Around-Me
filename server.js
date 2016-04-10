// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
//require db models
var db =require('./models');
//require bodyParser
var bodyParser = require('body-parser');
//require controllers
var controllers = require('./controllers');

app.use(bodyParser.urlencoded({ extended: true }));
// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get('/activityList', function (req, res) {
  res.sendFile(__dirname + '/views/activities.html');
});
// app.get('/activity', function (req, res) {
//   res.sendFile(__dirname + '/views/activity.html');
// });

/*
 * JSON API Endpoints
 */

app.get('/api', controllers.api.index);

app.get('/api/activities', controllers.activities.index);

app.get('/api/activities/:_id', controllers.activities.show);

// app.post('/api/activities', controllers.activities.create);
//
// app.put('/api/activities/:_id', controllers.activities.update);
//
app.delete('/api/activities/:_id', controllers.activities.destroy);




/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
