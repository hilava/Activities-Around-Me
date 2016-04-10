// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var activityList = [ {activity_name: "Hebrew Song & Movement",
                      category: "Kids",
                      description: "Hebrew Song & Movement Class: for ages 4 months - 2.5 years",
                      schedule: "Various Mornings and Afternoons - email for details",
                      location: "Sunnyvale, CA",
                      website:"",
                      image_url:"/images/song_and_movement.jpg",
                      instructor:"Ariela Edelman"
                    },
                      { activity_name: "Sippurchik",
                        category: "Kids",
                        description: "Bringing Israeli Childeren's Stpries to Life: for ages 2-4",
                        schedule: "Mon: 10 AM;   Tue: 5 PM;   Wed: 4:40 PM",
                        location: "Palo Alto, CA / Sunnyvale, CA",
                        website:"https://paloaltojcc.org/Events/evr/2/sippurchik-bringing-israeli-childrens-stories-to-life",
                        image_url:"/images/sippurchik.jpg",
                        instructor:"Koren"
                      },
                      { activity_name: "Thinking and Math Challenges",
                        category: "Kids",
                        description: "Thinking and Math Challenges: for ages 5-12 years",
                        schedule: "",
                        location: "Sunnyvale, CA",
                        website:"",
                        image_url:"/images/math_challenges.jpg",
                        instructor:"Yael Tal"
                      },
                      { activity_name: "Donna Running Club",
                        category: "Women's Sports",
                        description: "Running Groups Fot Kids, Teens and Adults",
                        schedule: "Dates and times vary, please refer to website below",
                        location: "Sunnyvale, CA",
                        website:"https://www.facebook.com/DonnaRunningClub/?fref=nf",
                        image_url:"/images/dona_running_club.jpg",
                        instructor:"Donna Gavriel"
                      },
                      { activity_name: "Gali Yoga",
                        category: "Women's Sports",
                        description: "Small-group Vinyassa Flow Classes",
                        schedule: "Mon: 7:15 PM - 8:15 PM  8:30 PM - 9:30 PM;   Wed: 7:15 PM - 8:15 PM  8:30 PM - 9:30 PM;" ,
                        location: "1399 S Winchester Blvd Suite 140, San Jose, CA",
                        website:"www.wholebodysj.com/yoga",
                        image_url:"/images/gali_yoga.jpg",
                        instructor:"Gali"
                      },
                      { activity_name: "Irit's Walking Groups",
                        category: "Women's Sports",
                        description: "Waking Groups / One On One Sessions",
                        schedule: "Tue: 9:00 AM - 10:00 AM;  Thu: 9:00 AM - 10:00 AM" ,
                        location: "Ortega Park",
                        website:"",
                        image_url:"/images/walking_groups1.jpg",
                        instructor:"Irit Friedman"
                      },
                      { activity_name: "Pilatis & Yoga With Limor",
                        category: "Women's Sports",
                        description: "Pilatis & Yoga classes",
                        schedule: "Tue: 9:30 AM + 8:30 PM;  Thu: 9:30 AM - 8:30 PM;   Sat: Every 2nd+4th Sat 9:30 AM" ,
                        location: "Palo Alto, CA",
                        website:"https://www.facebook.com/Yoga-with-Limor-174437502590567/?pnref=lhc",
                        image_url:"/images/pilatis_limor.jpg",
                        instructor:"Limor Nirpaz"
                      },
                      { activity_name: "Crochet with T-Shirt Yarn",
                        category: "Arts and Crafts",
                        description: "Crochet with T-Shirt Yarn for beginners",
                        schedule: "Dates and times vary, please contact instructor for more info" ,
                        location: "Sunnyvale, CA",
                        website:"",
                        image_url:"/images/tricot_knitting.jpg",
                        instructor:"Hila Morad"
                      },
                      { activity_name: "Halo Pottery",
                        category: "Arts and Crafts",
                        description: "Clay Pottery for childern, parent-child classes, adult wheel thrown classes",
                        schedule: "Dates and times vary, please refer to website below",
                        location: "Los Altos, CA",
                        website:"https://www.facebook.com/halopottery?_rdr=p",
                        image_url:"/images/halo_pottery.jpg",
                        instructor:"Hila Itzhak"
                      }
                    ];

  var instructorList = [ {  inst_name: "Ariela Edelman",
                            email: "edelmanariela@gmail.com",
                            password: "",
                            phone_num: ""
                        },
                        {  inst_name: "Koren",
                            email: "hweissberg@paloaltojcc.org",
                            password: "",
                            phone_num: ""
                        },
                        {  inst_name: "Yael Tal",
                            email: "yaeltal77@gmail.com",
                            password: "",
                            phone_num: "408-480-8514"
                        },
                        {  inst_name: "Donna Gavriel",
                            email: "donna.gavriel@gmail.com",
                            password: "",
                            phone_num: "503-415-0548"
                        },
                        {  inst_name: "Gali",
                            email: "galiyogasj@gmail.com",
                            password: "",
                            phone_num: "408-921-2912"
                        },
                        {  inst_name: "Irit Friedman",
                            email: "iritfreidman@yahoo.com",
                            password: "",
                            phone_num: "408-507-5015"
                        },
                        {  inst_name: "Limor Nirpaz",
                            email: "limor.nirpaz@gmail.com",
                            password: "",
                            phone_num: "650-605-7189"
                        },
                        {  inst_name: "Hila Morad",
                            email: "moradhi@gmail.com",
                            password: "",
                            phone_num: ""
                        },
                        {  inst_name: "Hila Itzhak",
                            email: "",
                            password: "",
                            phone_num: "650-471-2120"
                        }
                      ];
//nesting activity code inside the instructor code because db calls are asynchronous and we want this code to happen in order
db.Instructor.remove({}, function(err, instructors){
  console.log('removed all instructors');
  db.Instructor.create(instructorList, function(err, instructors){
    if(err){console.log(err); return;}
    console.log('recreated all instructors');
    console.log('created', instructors.length, "instructors");

    db.Activity.remove({}, function(err, activities){
      console.log('removed all activities');
      activityList.forEach(function(activityData){
        var activity = new db.Activity({
          activity_name: activityData.activity_name,
          category: activityData.category,
          description: activityData.description,
          schedule: activityData.schdeule,
          location: activityData.location,
          website: activityData.website,
          image_url: activityData.image_url,
          instructor: activityData.instructor,
        });
        db.Instructor.findOne({inst_name: activityData.instructor}, function(err,foundInstructor){
          console.log('found instructor ' + foundInstructor.inst_name + ' for activity ' + activity.activity_name);
          if(err){return console.log(err);}
          activity.instructor = foundInstructor;
          activity.save(function(err, savedActivity){
            if(err){return console.log(err);}
            console.log('saved ' + savedActivity.activity_name + ' by ' + foundInstructor.inst_name);
          });
        });
      });
    });
  });
});
