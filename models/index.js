var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/activities-around-me-app");

module.exports.Instructor = require("./instructor.js");
module.exports.Activity = require("./activity.js");
