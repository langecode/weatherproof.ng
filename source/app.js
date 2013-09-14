angular.module('weather', ['weatherService']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/weather/:city', {controller: WeatherCityCtrl, templateUrl: 'weather.html'}).
			when('/weather/:lat/:lng', {controller: WeatherLatLngCtrl, templateUrl: 'weather.html'});
}]);