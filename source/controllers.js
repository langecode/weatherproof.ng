
angular.module('weather').
controller('WeatherCtrl', ['$scope', '$routeParams', '$location', function ($scope, $routeParams, $location) {
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
}]).

controller('WeatherCityCtrl', ['$scope', '$routeParams', 'Weather', function ($scope, $routeParams, Weather) {
	'use strict';
	$scope.weather = Weather.city($routeParams.city);
}]).

controller('WeatherLatLngCtrl', ['$scope', '$routeParams', 'Weather', function ($scope, $routeParams, Weather) {
	'use strict';
	$scope.weather = Weather.latLng($routeParams.lat, $routeParams.lng);
}]);
