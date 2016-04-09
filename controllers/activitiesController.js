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










// export public methods here
module.exports = {
  index: index,
  // create: create,
  show: show
  // destroy: destroy,
  // update: update
};
