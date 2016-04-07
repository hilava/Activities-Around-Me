/* CLIENT-SIDE JS*/

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
  var actHtml = template(activities);
  $('#activityTarget').append(actHtml);
}
