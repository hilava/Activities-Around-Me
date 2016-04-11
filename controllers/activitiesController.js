/************
 * DATABASE *
 ************/
var db = require('../models');

// get all activities
function index(req, res) {
  db.Activity.find(function (err, activities){
    if(err){ return console.log("Find activities error: " + err);}
    //send all activities
    res.json(activities);
  });
}

//get all activities by category
function filter(req, res){
  console.log("req.body: " , req.query.category);
  db.Activity.find({category: req.query.category}, function (err, activities){
    if(err){return console.log("Find activities by categorey error: " + err);}
    res.json(activities) ;
  });
}

//get one activity
function show(req, res){
  db.Activity.findOne({_id: req.params._id }, function(err, foundActivity) {
    if(err){return console.log("Find one activity error: " + err);}
    res.json(foundActivity);
  });
}

//delete activity
function destroy(req, res){
  db.Activity.findOneAndRemove({_id: req.params._id }, function(err, removedActivity) {
    if(err){return console.log("Delete activity error: " + err);}
    res.json(removedActivity);
});
}

//create new activity_name
function create(req, res){
  //create the db doument and assign values to its attributes
  var newActivity = new db.Activity({
    category: req.body.category,
    activity_name: req.body.activity_name,
    description: req.body.description,
    location: req.body.location,
    website: req.body.website,
    image_url: req.body.image_url
  });
  //find the instructor from req.body
  db.Instructor.findOne({inst_name: req.body.instructor}, function(err, foundInstructor){
    if(err){consoler.log("Find Instructor Error: " + err);}
    //add the found instructor to the new activity
    newActivity.instructor = foundInstructor;
    //save newActivity to the db
    newActivity.save(function(err,savedActivity){
      if(err){consoler.log("Save Error: " + err);}
      //send back the new activity object
      res.json(savedActivity);
    });
  });
}

//update activity info
function update(req, res){
  var activityId = req.params._id;
  db.Activity.findOne({_id: activityId}, function(err, foundActivity){
    foundActivity.category = req.body.category;
    foundActivity.activity_name = req.body.activity_name;
    foundActivity.description = req.body.description;
    foundActivity.location = req.body.location;
    foundActivity.website = req.body.website;
    foundActivity.image_url = req.body.image_url;
    //find the instructor from req.body
    db.Instructor.findOne({inst_name: req.body.instructor}, function(err, foundInstructor){
      if(err){console.log("Find Instructor Error: " + err);}
      //add the found instructor to the new activity
      foundActivity.instructor = foundInstructor;
      //save updated activity to the db
      foundActivity.save(function(err,savedActivity){
        if(err){consoler.log("Save Error: " + err);}
        //send back the new activity object
        res.json(savedActivity);
      });
    });
  });
}

// export public methods here
module.exports = {
  create: create,
  show: show,
  destroy: destroy,
  index: index,
  update: update,
  filter: filter
};
