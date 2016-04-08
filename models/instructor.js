var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var InstructorSchema = new Schema({
  inst_name: String,
  email: String,
  password: String,
  phone_num: String,
});

var Instructor = mongoose.model('Instructor', InstructorSchema);

module.exports = Instructor;
