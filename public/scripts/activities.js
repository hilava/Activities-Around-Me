/* CLIENT-SIDE JS*/
var allActivities;

$(document).ready(function(){

  $.ajax({
  method: 'GET',
  url: '/api/activities',
  success: allActivitesSuccess
});


//close document.ready
});

function allActivitesSuccess(activities){
  // compile handlebars template
  var source = $('#activity-template').html();
  var template = Handlebars.compile(source);
  var actHtml = template({activities: activities});
  $('#activityTarget').append(actHtml);
}

//needs editing
function deleteActivitySuccess(activity){
  console.log(activity);
  var activityId = activity._id;
  console.log('show activity', activityId);
  // find the activity with the correct ID
  for(var index = 0; index < allActivities.length; index++) {
    if(allActivities[index]._id === activityId) {
      allActivities.splice(index, 1);
      break;
    }
  }
}
