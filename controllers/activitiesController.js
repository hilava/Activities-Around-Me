/************
 * DATABASE *
 ************/
var db = require('../models');

// get all activities
function index(req, res){
  db.Activity.find(function (err, activities){
    if(err){return console.log(err);}
    res.json(activities) ;
  });
}

//get one activity
function show(req, res){
  db.Activity.findOne({_id: req.params._id }, function(err, foundActivity) {
  res.json(foundActivity);
});

}

//Add new activity (POST)
// app.post('/api/activity', function(req, res){
//   console.log('add new activity');
//   //create new movie with form data ('req.body')
//   var newActivity = new db.Activity({
//     activity_name: req.body.activity_name,
//     category: req.body.category,
//     description: req.body.description,
//     schedule: req.body.schedule,
//     location: req.body.location,
//     website: req.body.website,
//     image_url: req.body.image_url,
//     instructor: req.body.instructor
//   });
//   //save newMovie to db
//   newMovie.save(function(err, movies){
//     if (err){ return console.log("save error: " + err);}
//     console.log("movie saved: " + movie);
//     res.json(movie);
//   });
// });








// export public methods here
module.exports = {
  index: index,
  //create: create,
  show: show
  // destroy: destroy,
  // update: update
};
