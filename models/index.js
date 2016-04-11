var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
                     process.env.MONGOHQ_URL ||
                     "mongodb://localhost/activities-around-me-app" );

module.exports.Instructor = require("./instructor.js");
module.exports.Activity = require("./activity.js");
