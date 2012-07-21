jQuery(function($) {

	$(document).ready(function() {			
		if (Modernizr.geolocation && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function(position) {
					console.log(position);
					var lat = position.coords.latitude;
					var lon = position.coords.longitude;
					getPlaces(lat,lon);
				}
			);
		}
		else {
			
			var jsonip = $.getJSON("http://jsonip.com?callback=?", function(json) {
				var ip_address = json.ip;
				var geoip = $.getJSON("http://freegeoip.net/json/" + json.ip + "?callback=?", function(json) {
					console.log(json);
					getPlaces(json.latitude, json.longitude);
				});
			});
		
		}

	});
});

function getapis(data) {
		var markers = [];
		var infowindows = []; 
		var ib = [];
		var bounds = new google.maps.LatLngBounds();
		$.each(data.articles, function(i, item){
			var myLatlng = new google.maps.LatLng(item.lat,item.lng);
			markers[i] = new google.maps.Marker({
        		position: myLatlng, 
		        map: window.wikimap.map,
        		title:item.title
			}); 		
		
			bounds.extend(myLatlng);
			var goToUrl = item.url;
			var content = "<h3 class='infoText'><a target='_blank' href='" + goToUrl + "'>" + item.title + "</a></h3>";
			var boxText = document.createElement("div");
			boxText.style.cssText = "border: 1px solid black; margin-top: 8px; background: #4682B4; padding: 5px; -webkit-border-radius: 6px; -moz-border-radius: 6px; border-radius: 6px;";
			boxText.innerHTML = content;
				
			var myOptions = {
				 content: boxText
				,disableAutoPan: false
				,maxWidth: 0
				,pixelOffset: new google.maps.Size(-140, 0)
				,zIndex: null
				,boxStyle: { 
				  background: "url('tipbox.gif') no-repeat"
				  ,opacity: 0.90
				  ,width: "280px"
				 }
				,closeBoxMargin: "10px 2px 2px 2px"
				,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
				,infoBoxClearance: new google.maps.Size(1, 1)
				,isHidden: false
				,pane: "floatPane"
				,enableEventPropagation: false
			};
			
			ib[i] = new InfoBox(myOptions);
	
			//ib[i] = new google.maps.InfoWindow({content: content, shadowStyle:2, borderRadius:4,arrowStyle: 2});

			google.maps.event.addListener(markers[i], 'click', function() {
				ib[i].open(window.wikimap.map,markers[i]);
			});
	});
	window.wikimap.map.fitBounds(bounds);
}

function getPlaces(lat, lon) {
	opts = {
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: new google.maps.LatLng(lat, lon),
		zoom: 5
	};
	//window.wikimap.map.setOptions(opts);
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(lat, lon);
	geocoder.geocode({'latLng': latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[1]) {
				var country = results[5].formatted_address;
			}
		}
	});
	var responseType = 'json';
	var url = 'http://api.wikilocation.org/articles?limit=50&radius=5000&format=' + responseType + '&lat=' + lat + '&lng=' + lon + '&jsonp=getapis&callback=?';
	$.getJSON(url, function(data){});
}

function codeAddress() {
	var address = document.getElementById("address").value;
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			//window.wikimap.map.setCenter(results[0].geometry.location);
			var coordObj = results[0].geometry.location;
			if (window.console) {
				console.log(coords);
			}
			var coords = coordObj.toString();
			coords = coords.replace(" ","");
			coords = coords.replace(")","");
			coords = coords.replace("(","");			
			coords = coords.split(",");
			getPlaces(coords[0],coords[1]);
			
		} else {
			alert("Geocode was not successful for the following reason: " + status);
		}
	});
}
