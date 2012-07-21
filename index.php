<html>
<head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<script src="http://maps.google.com/maps/api/js?sensor=false"></script>
	<script src="js/geo.js"></script>
        <script src="js/infobox.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/modernizr/2.5.3/modernizr.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/style.css" />
	<link href='http://fonts.googleapis.com/css?family=Press+Start+2P' rel='stylesheet' type='text/css'>
</head>
<body>
		<h1>geowiki</h1>
			<form action="" onsubmit="codeAddress();return false;">
				<input id="address" type="textbox" value="Berlin, Germany">
				<input id="submit" type="submit" value="wikify!">
			</form>
			<div id="map_canvas" style="width: 100%; height: 70%;"></div>
			<script type="text/javascript">	
				jQuery(function($) {
					var canvas = $('#map_canvas'),
						opts = {
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							center: new google.maps.LatLng(31, 23),
							zoom: 1
						},
						map = new google.maps.Map(canvas[0], opts);

					window.wikimap = {};
					window.wikimap.markers = [];
					window.wikimap.infoWindows = [];
					window.wikimap.map = map;
				});

			</script>
</body>
</html>
