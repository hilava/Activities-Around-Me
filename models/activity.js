var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  Instructor = require('./instructor');

  var ActivitySchema = new Schema({
    activity_name: String,
    category: [String],
    description: String,
    schedule: String,
    location: String,
    website: String,
    //contact_info: {email: String, phone_num: String},
    image_url:String,
    instructor: Instructor.schema
  });

var Activity = mongoose.model('Activity', ActivitySchema);
module.exports = Activity;
