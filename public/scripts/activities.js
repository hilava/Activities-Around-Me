/* CLIENT-SIDE JS*/
var allActivities;

$(document).ready(function(){

  $.ajax({
  method: 'GET',
  url: '/api/activities',
  success: allActivitesSuccess
});

// //listen to click on the activity $(this).collaps()
// $('#activityTarget').on('click', '.activity', function(e) {
//   $(this).closest('.collapse').collapse();
// });


//listen to click on activity
// $('#activityTarget').on('click', '.activity', function(e) {
//     //use closest since the activities are not rendered yet on page load. it looks for the closeset activity class under activityTarget
//     var id= $(this).closest('.activity').data('activity-id');
//     console.log('id: ',id);
//     //add a data attribute to the activityModal element after we have activities on our page
//     $('#activityModal').data('activity-id', id);
//     $.ajax({
//     method: 'GET',
//     url: '/api/activities/' + $('.activity').data('activity-id'),
//     success: oneActivitySuccess
//     });
//
//     //$('#activityModal').modal();
// });


//close document.ready
});

function allActivitesSuccess(activities){
  // compile handlebars template
  var source = $('#activity-template').html();
  var template = Handlebars.compile(source);
  var actHtml = template({activities: activities});
  $('#activityTarget').append(actHtml);
}

function oneActivitySuccess(activity){
  console.log("client side receiving activity: " , activity);
  // compile handlebars template
  // var source = $('#activity-modal-template').html();
  // var template = Handlebars.compile(source);
  // var actHtml = template({activity: activity});

  ////$('#activityTarget').append(actHtml);
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
