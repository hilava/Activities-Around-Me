/* CLIENT-SIDE JS*/
var activitiesArr = [];
var template;
var category="Women's Sports";

$(document).ready(function(){
  //compile HB script
  var source = $('#activity-template').html();
  template = Handlebars.compile(source);
  //on page load, retrieve all activities and save them to the activitiesArr
  $.ajax({
  method: 'GET',
  url: '/api/activities/',
  success: allActivitesSuccess,
  error: allActivitesError
  });
  //listen to click on a menu category (photo)
  $('.photo').on('click' ,function(){
    var category = $(this).attr('data-cat');
    //remove border from all 3 category photo
    $('.row .photo').css("border","0");
    //add border to the selected category phot
    $(this).css("border", "10px solid #021a40");
    //get all activities of the selected category
    $.ajax({
    method: 'GET',
    url: '/api/activitiesByCategory',
    data: {category: category},
    success: activitesByCatSuccess,
    error: activitesByCatError
    });
  });

  //listen to click on add activity button
  $('#addActivityBtn').on('click', function(e){
    e.preventDefault();
    //open the add activity modal
    $('#activityModal').modal();
    //set data-btnName attribute in order to know what ajax call to use
  $('#activityModal').attr('data-btnName', 'addActivity');
  });

  //listen to click on update activity button
  $('#activityTarget').on('click', '#updateActivityBtn', function(e){
    e.preventDefault();
    //open the add activity modal
    $('#activityModal').modal();
    //set data-btnName attribute in order to know what ajax call to use
    $('#activityModal').attr('data-btnName', 'updateActivity');
    $('#activityModal').attr('data-id', $(this).attr('data-id'));
  });

  //listen to click on save changes button, in activityModal, after add/update activity
  $('#saveActivity').on('click', function(e){
    e.preventDefault();
    var dataString = "activity_name=" + $('#activity_name').val() + "&category=" + $('#category').val() + "&description=" +
                    $('#description').val() + "&location=" + $('#location').val() + "&website=" + $('#website').val() + "&instructor=" +
                    $('#instructor').val() + "&image_url=" + $('#image_url').val();
    if($('#activityModal').attr('data-btnName') === 'addActivity') {
      //ajax call to add activity
      $.ajax({
        method: 'POST',
        url: '/api/activities',
        data: dataString,
        success: addActivitySuccess,
        error: addActivityError
      });
    }
    else if($('#activityModal').attr('data-btnName') === 'updateActivity') {
      //ajax call to update activity
      $.ajax({
        method:'PUT',
        url: '/api/activities/' + $('#activityModal').attr('data-id'),
        data: dataString,
        success: updateActivitySuccess,
        error: updateActivityError
      });
    }
  });

  //listen to click on delete activity button
  $('#activityTarget').on('click', '#deleteActivityBtn', function(e){
    e.preventDefault();
      $.ajax({
      method: 'DELETE',
      url: '/api/activities/'+$(this).attr('data-id'),
      success: deleteActivitySuccess,
      error: deleteActivityError
      });
  });


//close document.ready
});

function allActivitesSuccess(activities){
  //save activties to the activitiesArr on page load
  activitiesArr = activities;
}

function allActivitesError(err){
  console.log("All activities error: " + err);
}

function activitesByCatSuccess(activities){
  //render all activities for the selected category
  $('#activityTarget').empty();
  // var actHtml = template({activities: activities});
  // $('#activityTarget').append(actHtml);
  // $('.actiivty').focus();
  activitiesArr = activities;
  render(activitiesArr);
}

function activitesByCatError(err){
  console.log("Activties by category error: " + err);
}

function deleteActivitySuccess(activity){
  var activityId = activity._id;
  //itirate through the array and remove the deleted acivity
  for (var i=0; i<activitiesArr.length; i++) {
    if (activitiesArr[i]._id === activityId) {
      activitiesArr.splice(i, 1);
      //once the activity has been found, exit loop
      break;
    }
  }
  //render all activities without the deleted activity
  // $('#activityTarget').empty();
  // var actHtml = template({activities: activitiesArr});
  // $('#activityTarget').append(actHtml);
  render(activitiesArr);
}

function deleteActivityError(err){
  console.log("Delete activity error: " + err);
}

function addActivitySuccess(newActivity){
  //clear form input fields
  $('#activityModal input').val('');
  $('#activityModal select').val('');
  //push new activity to the array
  activitiesArr.push(newActivity);
  alert("Activity " + newActivity.activity_name + " Has Been Added, Thank You!");
  //close the modal
  $('#activityModal').modal('toggle');
  //remove border from all 3 category photo
  $('.row .photo').css("border","0");
  //remove activties from page
  $('#activityTarget').empty();
}

function addActivityError(err){
    console.log("Add activity error: " + err);
}

function updateActivitySuccess(updatedActivity){
  //clear form input fields
  console.log("updateActivitySuccess function");
  $('#activityModal input').val('');
  $('#activityModal select').val('');
  var activityId = updatedActivity._id;
  console.log("activity id: " + activityId);
  //find the updated activity in the activities array, remove it and add the updated activity
  activitiesArr.forEach(function(activity, i){
    //itirate through the array and remove the deleted acivity
      if (activity._id === activityId) {
        //remove the original activity
        activitiesArr.splice(i, 1);
        //add the updated actiivty
        activitiesArr.push(activity);
        //once the activity has been found, exit loop
        //break;
      }
  });

  alert("Activity " + updatedActivity.activity_name + " Has Been Updated, Thank You!");
  //close the modal
  $('#activityModal').modal('toggle');
  //remove border from all 3 category photo
  $('.row .photo').css("border","0");
  //remove activties from page
  $('#activityTarget').empty();

}

function updateActivityError(){
  console.log("Update activity error: " + err);
}


//render acitivities
function render(activities){
  //remove activities
  $('#activityTarget').empty();
  var actHtml = template({activities: activities});
  //prepend activities
  $('#activityTarget').prepend(actHtml);
  //set focus on the activty area
  $('.actiivty').focus();
}
