/************
 * DATABASE *
 ************/
//var db = require('../models');

//GET /api/activities

var activities = [ {activity_name: "Hebrew Song & Movement",
                      category: ["kids"],
                      description: "Hebrew Song & Movement Class: for ages 4 months - 2.5 years",
                      schedule: "Various Mornings and Afternoons - email for details",
                      location: "Sunnyvale, CA",
                      website:"",
                      contact_info: {email: "edelmanariela@gmail.com", phone_num: ""},
                      image_url:"/images/song_and_movement.jpg",
                      instructor_id:"1"
                    },
                      { activity_name: "Sippurchik",
                        category: ["kids"],
                        description: "Bringing Israeli CHilderen's Stpries to Life: for ages 2-4",
                        schedule: "Mon: 10 AM;   Tue: 5 PM;   Wed: 4:40 PM",
                        location: "Palo Alto, CA / Sunnyvale, CA",
                        website:"http://paloaltojcc.org/Events/evr/2/sippurchik-bringing-israeli-childrens-stories-to-life",
                        contact_info: {email: "hweissberg@paloaltojcc.org", phone_num: ""},
                        image_url:"/images/sippurchik.jpg",
                        instructor_id:"2"
                      },
                    ];

function index(req, res){
res.json({activities: activities});
}



// // GET /api/albums
// function index(req, res) {
//   // send all books as JSON response
//   db.Album.find(function (err, albums){
//     if(err){ return console.log("error: " + err);}
//     res.json(albums);
//   });
//
//   }















// export public methods here
module.exports = {
  index: index,
  // create: create,
  // show: show,
  // destroy: destroy,
  // update: update
};
