$(document).ready(function(){
console.log('url:/api/activities/'+ $(this).attr('data-activity-id'));
  $.ajax({
  method: 'GET',
  url: '/api/activities/' + $('.activity').attr('data-activity-id'),
  success: oneActivitySuccess
  });
//close document.ready
});

function oneActivitySuccess(activity){
  console.log("client side receiving activity: " , activity);
  // compile handlebars template
  var source = $('#activity-template').html();
  var template = Handlebars.compile(source);
  var actHtml = template({activity: activity});
  $('#activityTarget').append(actHtml);
}
