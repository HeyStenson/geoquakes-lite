var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

var map;

$(document).ready(function(){

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.6189, lng: -122.3750},
    zoom: 3
  });

  $.get(weekly_quakes_endpoint, function(data){
  		var quakes = data.features;
  		quakes.forEach(function(quake){
  			var title = quake.properties.title;
  			var hours_ago = Math.round( ( Date.now() - quake.properties.time ) / (1000*60*60) );
  			$('#info').append('<h2>' + title + '</h2>' + '<p>This quake happened ' + hours_ago + ' hours ago' + '</p>' + '<hr>');
  			var lat = quake.geometry.coordinates[1];
  			var lng = quake.geometry.coordinates[0];
  			new google.maps.Marker({
  			  position: new google.maps.LatLng(lat,lng),
  			  map: map,
  			  title: title
  			});
  		});
  });

});
