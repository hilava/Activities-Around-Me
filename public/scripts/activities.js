/* CLIENT-SIDE JS*/
var ActivitiesArr = [];
var template;
var category="Women's Sports";

$(document).ready(function(){
  var source = $('#activity-template').html();
  template = Handlebars.compile(source);

//   $.ajax({
//   method: 'GET',
//   url: '/api/activities',
//   success: allActivitesSuccess,
//   error: allActivitesError
// });
  $('.menu img').on('click' ,function(){
    var category = $(this).attr('data-cat');
    console.log("category" + category);
    $.ajax({
    method: 'GET',
    url: '/api/activities/',
    data: {category: category},
    success: allActivitesSuccess,
    error: allActivitesError
    });
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
  //add activity
  $('.form-horizontal').on('submit', function(event){
    event.preventDefault();
    $.ajax({
      method:'POST',
      url:'/api/albums',
      data: $(this).serialize(),
      success: addAlbumSuccess
    });
  });

//close document.ready
});

function allActivitesSuccess(activities){
  //render all activities
  $('#activityTarget').empty();
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
