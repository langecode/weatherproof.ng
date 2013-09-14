angular.module('weatherService', []).
	factory('Weather', function($http) {
		return {
			api: 'http://api.openweathermap.org/data/2.5/weather?callback=JSON_CALLBACK&',
			
			transform: function(weather) {
				var result = angular.copy(weather.data);

				// Convert Kelvin to Fahrenheit.
				result.main.temp = Math.floor((result.main.temp - 273.15) * 1.8) + 32;

				// Convert wind speed to MPH.
				result.wind.speed = (result.wind.speed * 1.15078).toFixed(2);
				
				return result;
			},
			
			city: function(city) {
				return $http({method: 'JSONP', url: this.api + 'q=' + city}).
					then(this.transform);
			},
			
			latLng: function(lat, lng) {
				return $http({method: 'JSONP', url: this.api + 'lat=' + lat + '&lon=' + lng}).
					then(this.transform);
			}
		};
	});