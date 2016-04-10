/* CLIENT-SIDE JS*/
var ActivitiesArr = [];
var template;

$(document).ready(function(){
  var source = $('#activity-template').html();
  template = Handlebars.compile(source);

  $.ajax({
  method: 'GET',
  url: '/api/activities',
  success: allActivitesSuccess,
  error: allActivitesError
});

//listen to click on delete button
$('#activityTarget').on('click', '#deleteActivityBtn', function(e){
  e.preventDefault();
    $.ajax({
    method: 'DELETE',
    url: '/api/activities/'+$(this).attr('data-id'),
    success: deleteActivitySuccess,
    error: deleteActivityError
    });
  
});




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
  var actHtml = template({activities: activities});
  $('#activityTarget').append(actHtml);
  ActivitiesArr = activities;
}

function allActivitesError(err){
  console.log("error: " + err);
}

function deleteActivitySuccess(activity){
  var activityId = activity._id;
  for (var i=0; i<ActivitiesArr.length; i++) {
    console.log("id1: " + ActivitiesArr[i]._id + "id2: " + activityId);
    if (ActivitiesArr[i]._id === activityId) {
      ActivitiesArr.splice(i, 1);
      break;
    }
  }
  //render all activities
  $('#activityTarget').empty();
  var actHtml = template({activities: ActivitiesArr});
  $('#activityTarget').append(actHtml);
}

function deleteActivityError(err){
  console.log("error: " + err);
}
