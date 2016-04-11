/* CLIENT-SIDE JS*/
var ActivitiesArr = [];
var template;
var category="Women's Sports";

$(document).ready(function(){
  var source = $('#activity-template').html();
  template = Handlebars.compile(source);

  //listen to click on a menu category
  $('.photo').on('click' ,function(){
    var category = $(this).attr('data-cat');
    //remove border from all 3 category photo
    $('.row .photo').css("border","0");
    //add border to the selected category phot
    $(this).css("border", "10px solid #021a40");
    //get all activities of the selected category
    $.ajax({
    method: 'GET',
    url: '/api/activities/',
    data: {category: category},
    success: allActivitesSuccess,
    error: allActivitesError
    });
  });

  //listen to click on add activity button
  $('#addActivityBtn').on('click', function(e){
    e.preventDefault();
    //open the add activity modal
    $('#activityModal').modal();
  });

  //listen to click on add activity-->save changes button
  $('#saveActivity').on('click', function(e){
    e.preventDefault();
    var dataString = "activity_name=" + $('#activity_name').val() + "&category=" + $('#category').val() + "&description=" +
                    $('#description').val() + "&location=" + $('#location').val() + "&website=" + $('#website').val() + "&instructor=" +
                    $('#instructor').val() + "&image_url=" + $('#image_url').val();
    $.ajax({
      method: 'POST',
      url: '/api/activities',
      data: dataString,
      success: addActivitySuccess,
      error: addActivityError
    });
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
  //render all activities
  $('#activityTarget').empty();
  var actHtml = template({activities: activities});
  $('#activityTarget').append(actHtml);
  $('.actiivty').focus();
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
  console.log("Delete Activity Error: " + err);
}

function addActivitySuccess(newActivity){
  //clear form input fields
  $('#activityModal input').val('');
  //push new activity to the array
  ActivitiesArr.push(newActivity);
  //render all activities
  alert("Activity " + newActivity.activity_name + " Has Been Added, Thank You!");
  $('#activityModal').modal('toggle');

}

function addActivityError(err){
    console.log("Add Activity Error: " + err);
}
