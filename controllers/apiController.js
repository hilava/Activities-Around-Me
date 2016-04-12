function index(req, res) {
  res.json({
    message: "Welcome to Activities Around Me",
    documentation_url: "https://github.com/hilava/Activities-Around-Me/blob/master/README.md",
    base_url: "https://shielded-wave-86647.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"},
      {method: "GET", path: "/api/activities", description: "Shows all activities"},
      {method: "GET", path: "/api/activities/:_id'", description: "Shows a specific activity by id"},
      {method: "POST", path: "/api/activities", description: "Creates a new activity"},
      {method: "PUT", path: "/api/activities/:_id", description: "Updates a specific activity by id"},
      {method: "DELETE", path: "/api/activities/:_id", description: "Deletes a specific activity by id"},
      {method: "GET", path: "/api/activitiesByCategory", description: "Shows all activities in a specific category"}
    ]
  });
}



module.exports.index = index;
