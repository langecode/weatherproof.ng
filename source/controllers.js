
function WeatherCtrl($scope, $routeParams, $location) {
	'use strict';
	
	$scope.tryGeolocation = true;
	$scope.placeholder = "Find location.";
	
	$scope.detect = function() {
		$scope.tryGeolocation = true;
		$scope.changeWeather();
	};
	
	$scope.showWeather = function() {
		$location.path("/weather/" + $scope.city);
	};

	/**
	 * Is really "get ready" - trying to look up location else let the user write the location
	 */
	$scope.changeWeather = function() {
	    if (navigator.geolocation && $scope.tryGeolocation) {
			$scope.tryGeolocation = false;
			navigator.geolocation.getCurrentPosition(
				function(geo) {
					var lat = geo.coords.latitude;
					var lng = geo.coords.longitude;
					$location.path("/weather/" + lat + "/" + lng);
				},
				function() {
					$scope.placeholder = "Unable to get location, please type manually.";
				},
				// If a location is not found after five seconds, timeout.
				{ timeout: 5000 }
			);
		}
	};
}

function WeatherCityCtrl($scope, $routeParams, $location, Weather) {
	'use strict';
	console.log("instantiated city");
	console.log("city: " + $routeParams.city);
	$scope.weather = Weather.city($routeParams.city);
}

function WeatherLatLngCtrl($scope, $routeParams, $location, Weather) {
	'use strict';
	console.log("lat: " + $routeParams.lat + " lng: " + $routeParams.lng);
	$scope.weather = Weather.latLng($routeParams.lat, $routeParams.lng);
}