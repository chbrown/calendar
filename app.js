/*jslint browser: true */ /*globals angular */

var app = angular.module('app', [
  'ngStorage',
]);

var encodeQuerystring = function(query) {
  var pairs = [];
  for (var key in query) {
    var value = encodeURI(query[key]);
    if (value) {
      pairs.push(key + '=' + value);
    }
  }
  return '?' + pairs.join('&');
};

var format_iso8601 = function(date, time) {
  return time ? date + 'T' + time : date;
};

app.controller('calendarCtrl', function($scope, $http, $localStorage) {
  $scope.$storage = $localStorage;

  var refresh = function() {
    var start_iso8601 = format_iso8601($scope.$storage.start_date, $scope.$storage.start_time);
    var end_iso8601 = format_iso8601($scope.$storage.end_date, $scope.$storage.end_time);

    var query = {
      action: 'TEMPLATE',
      text: $scope.$storage.text,
      details: $scope.$storage.details,
      location: $scope.$storage.location,
      dates: start_iso8601 + '/' + end_iso8601,
    };

    $scope.google_url = 'http://www.google.com/calendar/event' + encodeQuerystring(query);
  };

  $scope.$watchGroup([
    '$storage.text',
    '$storage.details',
    '$storage.location',
    '$storage.start_date',
    '$storage.start_time',
    '$storage.end_date',
    '$storage.end_time',
  ], refresh, true);

});
