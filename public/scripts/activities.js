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
    //after selection, fade out the 3 categories
    $('.photo').addClass('inactive');
    //highlight the slected category
    $(this).removeClass('inactive');
    $(this).addClass('active');

    //get all activities of the selected category
    var category = $(this).attr('data-cat');
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
    //remove activties from page
    $('#activityTarget').empty();
    //remove fade out effect from categories
    $('.photo').removeClass('inactive');
    $('.photo').addClass('active');
    //open the add activity modal
    $('#activityModal').modal();
    //clear form input fields
    $('#activityModal input').val('');
    $('#activityModal option').val('');
    //set data-btnName attribute in order to know what ajax call to use
  $('#activityModal').attr('data-btnName', 'addActivity');
  });

  //listen to click on update activity button
  $('#activityTarget').on('click', '#updateActivityBtn', function(e){
    e.preventDefault();
    //open the add activity modal
    $('#activityModal').modal();
    var activityId = $(this).attr('data-id');
    //find the activty in activitiesArr and populate the modal input fields
    activitiesArr.forEach(function(activity, i){
      if (activity._id === activityId) {
        //populate modal input fields
        $('#activity_name').val(activity.activity_name);
        $('#category').val(activity.category);
        $('#description').val(activity.description);
        $('#location').val(activity.location);
        $('#website').val(activity.website);
        $('#image_url').val(activity.image_url);
        $('#instructor').val(activity.instructor.inst_name);
      }
    });

    //set data-btnName attribute in order to know what ajax call to use
    $('#activityModal').attr('data-btnName', 'updateActivity');
    $('#activityModal').attr('data-id', activityId);
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
  render(activitiesArr);
}

function deleteActivityError(err){
  console.log("Delete activity error: " + err);
}

function addActivitySuccess(newActivity){
  //push new activity to the array
  activitiesArr.push(newActivity);
  //close the modal
  $('#activityModal').modal('toggle');
  //open message modal
  $('#messageModal').modal();
  //clear form input fields
  $('#activityModal input').val('');
  $('#activityModal option').val('');
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
      }
  });
  //close the modal
  $('#activityModal').modal('toggle');
  //open message model
  $('#messageModal').modal();
  //remove activties from page
  //clear form input fields
  $('#activityModal input').val('');
  $('#activityModal option').val('');
  $('#activityTarget').empty();
  //remove fade out effect from categories
  $('.photo').removeClass('inactive');
  $('.photo').addClass('active');
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
